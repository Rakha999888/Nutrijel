import React, { useState, useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";
import * as tf from "@tensorflow/tfjs";
import Select from "react-select";
import toast from "react-hot-toast";

ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController);

const MODEL_URL = "/ml_model/model.json";
const TOKENIZER_URL = "/ml_model/tokenizer.json";
const SCALER_PARAMS_URL = "/ml_model/scaler_params.json";

// Konfigurasi default untuk model, akan diupdate saat resource dimuat
let MODEL_CONFIG = {
  maxLength: 8, // Fallback default
  padTokenId: 0,
  oovTokenId: 1,
};

const portalStyles = {
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

const Tracker = () => {
  // --- STATE ---
  const [foodItems, setFoodItems] = useState([]);
  const [category, setCategory] = useState(null);
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [mlModel, setMlModel] = useState(null);
  const [tokenizerWordIndex, setTokenizerWordIndex] = useState(null);
  const [scalerParams, setScalerParams] = useState(null);
  const [isMlLoading, setIsMlLoading] = useState(true);
  const [mlError, setMlError] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null); // Item yang akan dihapus
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false); // Modal untuk konfirmasi hapus semua

  // --- DATA STATIS ---
  const foodCategories = ["Karbohidrat", "Protein", "Sayur", "Buah"];
  const foodNames = {
    Karbohidrat: [
      "nasi putih",
      "nasi goreng",
      "nasi kuning",
      "nasi liwet",
      "nasi timbel",
      "nasi uduk",
      "bihun goreng",
      "bubur ayam",
      "jagung rebus",
      "kentang goreng",
      "ketupat",
      "kwetiau goreng",
      "lemper",
      "lontong",
      "martabak manis",
      "mie ayam",
      "mie goreng",
      "roti bakar",
      "singkong goreng",
      "ubi rebus",
    ],
    Protein: [
      "ayam goreng",
      "ayam bakar",
      "ayam kremes",
      "ayam penyet",
      "ayam pop",
      "bakso",
      "batagor",
      "bebek goreng",
      "cumi goreng tepung",
      "dendeng balado",
      "empal gepuk",
      "gulai ayam",
      "gulai ikan",
      "gulai tunjang",
      "iga bakar",
      "ikan asam manis",
      "ikan bakar",
      "ikan goreng",
      "ikan kembung balado",
      "lele goreng",
      "opor ayam",
      "paru goreng",
      "pepes ikan",
      "perkedel",
      "rendang daging",
      "sate ayam",
      "sate kambing",
      "sate lilit",
      "sate padang",
      "semur daging",
      "siomay",
      "soto ayam",
      "soto betawi",
      "tahu bacem",
      "tahu goreng",
      "telur balado",
      "telur dadar",
      "tempe bacem",
      "tempe goreng",
      "tongseng kambing",
      "udang goreng",
    ],
    Sayur: ["bayam bening", "cap cay", "oseng buncis", "pecel", "sayur asem", "sayur lodeh", "sayur sop", "terong balado", "tumis kangkung", "tumis pare", "tumis toge", "urap"],
    Buah: [
      "alpukat",
      "anggur",
      "apel",
      "belimbing",
      "duku",
      "durian",
      "jambu air",
      "jambu biji",
      "jeruk",
      "kelengkeng",
      "mangga",
      "manggis",
      "melon",
      "naga merah",
      "nanas",
      "pepaya",
      "pisang",
      "rambutan",
      "salak",
      "semangka",
      "sirsak",
      "strawberry",
    ],
  };
  const units = ["Porsi", "Buah", "Butir", "Potong"];

  // --- REFS ---
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // --- EFEK-EFEK ---
  useEffect(() => {
    const loadResources = async () => {
      try {
        const [model, tokenizerResponse, scalerResponse, foodsResponse] = await Promise.all([tf.loadLayersModel(MODEL_URL), fetch(TOKENIZER_URL), fetch(SCALER_PARAMS_URL), fetch("http://localhost:9000/foods")]);

        setMlModel(model);

        const tokenizerData = await tokenizerResponse.json();
        let loadedWordIndex = tokenizerData.config?.word_index || tokenizerData.word_index;
        if (typeof loadedWordIndex === "string") loadedWordIndex = JSON.parse(loadedWordIndex);
        setTokenizerWordIndex(loadedWordIndex);

        setScalerParams(await scalerResponse.json());

        if (foodsResponse.ok) {
          const foodsResult = await foodsResponse.json();
          if (foodsResult.status === "success") setFoodItems(foodsResult.data);
        } else {
          throw new Error("Gagal mengambil data makanan.");
        }
      } catch (error) {
        console.error("❌ Failed to load resources:", error);
        setMlError(`Gagal memuat resource: ${error.message}.`);
        toast.error("Gagal memuat resource. Coba refresh halaman.");
      } finally {
        setIsMlLoading(false);
      }
    };
    loadResources();
  }, []);

  useEffect(() => {
    if (name?.value) {
      const unitMap = { telur: "Butir" };
      let newUnit = "Porsi";
      if (unitMap[name.value.toLowerCase()]) newUnit = unitMap[name.value.toLowerCase()];
      else if (category?.value === "Buah") newUnit = "Buah";
      setUnit({ value: newUnit, label: newUnit });
    }
  }, [name, category]);

  useEffect(() => {
    const performAnalysis = async () => {
      if (foodItems.length > 0 && !isMlLoading && mlModel && tokenizerWordIndex && scalerParams) {
        setIsAnalyzing(true);
        await new Promise((resolve) => setTimeout(resolve, 50));
        await handleAnalysis();
        setIsAnalyzing(false);
      } else if (foodItems.length === 0) {
        setAnalysisResult(null);
      }
    };
    performAnalysis();
  }, [foodItems, isMlLoading, mlModel, tokenizerWordIndex, scalerParams]);

  useEffect(() => {
    if (chartRef.current && analysisResult) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new ChartJS(ctx, {
        type: "doughnut",
        data: {
          labels: ["Karbohidrat (g)", "Protein (g)", "Lemak (g)"],
          datasets: [
            {
              data: [analysisResult.karbohidratGrams, analysisResult.proteinGrams, analysisResult.lemakGrams],
              backgroundColor: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
              borderWidth: 0,
              cutout: "70%",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (c) => `${c.label || ""}: ${c.parsed !== null ? c.parsed.toFixed(1) + "g" : "-"}` } },
          },
        },
      });
    }
    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [analysisResult]);

  // --- FUNGSI-FUNGSI MACHINE LEARNING ---
  const preprocessInputForModel = (foodNames) => {
    const sequences = foodNames.map((name) => {
      const cleanedName = name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const tokens = cleanedName.split(" ").filter((token) => token.length > 0);
      let sequence = tokens.map((word) => tokenizerWordIndex[word] || MODEL_CONFIG.oovTokenId);
      if (sequence.length < MODEL_CONFIG.maxLength) {
        sequence = sequence.concat(new Array(MODEL_CONFIG.maxLength - sequence.length).fill(MODEL_CONFIG.padTokenId));
      } else {
        sequence = sequence.slice(0, MODEL_CONFIG.maxLength);
      }
      return sequence;
    });
    return tf.tensor2d(sequences, [foodNames.length, MODEL_CONFIG.maxLength], "int32");
  };

  const postprocessModelOutput = (predictionTensor, itemsForAnalysis) => {
    const featureNames = scalerParams.feature_names;
    const means = scalerParams.mean;
    const stdDevs = scalerParams.scale;
    const rawPredictionArray = predictionTensor.arraySync();

    const calorieIndex = featureNames.findIndex((name) => name.toLowerCase().includes("kalori"));
    const proteinIndex = featureNames.findIndex((name) => name.toLowerCase().includes("protein"));
    const fatIndex = featureNames.findIndex((name) => name.toLowerCase().includes("lemak"));
    const carbIndex = featureNames.findIndex((name) => name.toLowerCase().includes("karbohidrat"));

    let totalCalories = 0,
      totalProteinGrams = 0,
      totalLemakGrams = 0,
      totalKarbohidratGrams = 0;

    rawPredictionArray.forEach((itemPrediction, index) => {
      const foodItem = itemsForAnalysis[index];
      const quantityFactor = Number(foodItem.quantity) || 1;

      let calories_descaled = Math.max(0, itemPrediction[calorieIndex] * stdDevs[calorieIndex] + means[calorieIndex]);
      let protein_descaled = Math.max(0, itemPrediction[proteinIndex] * stdDevs[proteinIndex] + means[proteinIndex]);
      let lemak_descaled = Math.max(0, itemPrediction[fatIndex] * stdDevs[fatIndex] + means[fatIndex]);
      let karbo_descaled = Math.max(0, itemPrediction[carbIndex] * stdDevs[carbIndex] + means[carbIndex]);

      totalCalories += calories_descaled * quantityFactor;
      totalProteinGrams += protein_descaled * quantityFactor;
      totalLemakGrams += lemak_descaled * quantityFactor;
      totalKarbohidratGrams += karbo_descaled * quantityFactor;
    });

    let recommendation = "Analisis nutrisi selesai.";
    if (totalCalories > 2500) recommendation += " Asupan kalori Anda cukup tinggi hari ini.";
    else if (totalCalories < 1500 && totalCalories > 0) recommendation += " Pertimbangkan untuk menambah asupan kalori.";

    return {
      totalCalories: parseFloat(totalCalories.toFixed(2)),
      karbohidratGrams: parseFloat(totalKarbohidratGrams.toFixed(2)),
      proteinGrams: parseFloat(totalProteinGrams.toFixed(2)),
      lemakGrams: parseFloat(totalLemakGrams.toFixed(2)),
      recommendation: recommendation,
    };
  };

  const handleAnalysis = async () => {
    if (isMlLoading || !mlModel || !tokenizerWordIndex || !scalerParams) return;
    if (foodItems.length === 0) return;
    try {
      const foodNamesForModel = foodItems.map((item) => item.name);
      const inputTensor = preprocessInputForModel(foodNamesForModel);
      const predictionTensor = mlModel.predict(inputTensor);
      const resultData = postprocessModelOutput(predictionTensor, foodItems);
      setAnalysisResult(resultData);
      tf.dispose([inputTensor, predictionTensor]);
    } catch (error) {
      console.error("Error during ML analysis:", error);
      toast.error(`Analisis gagal: ${error.message}`);
    }
  };

  // --- FUNGSI-FUNGSI FORM HANDLING (CRUD) ---
  const handleSubmit = async () => {
    if (!category || !name || !unit) {
      toast.error("Harap lengkapi Kategori, Nama, dan Satuan!");
      return;
    }
    setIsSubmitting(true);
    const foodData = { category: category.value, name: name.value, quantity: Number(quantity), unit: unit.value };

    const apiCall = async () => {
      let response;
      const url = editingId ? `http://localhost:9000/foods/${editingId}` : "http://localhost:9000/foods";
      const method = editingId ? "PUT" : "POST";
      response = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(foodData) });
      if (!response.ok) throw new Error(`Server error ${response.status}`);
      const result = await response.json();
      if (result.status === "success") {
        if (editingId) setFoodItems(foodItems.map((item) => (item.id === editingId ? result.data : item)));
        else setFoodItems([...foodItems, result.data]);
        resetForm();
      } else {
        throw new Error(result.message || "Gagal menyimpan data.");
      }
    };

    toast
      .promise(apiCall(), {
        loading: "Menyimpan...",
        success: <b>{editingId ? "Berhasil diperbarui!" : "Berhasil ditambahkan!"}</b>,
        error: (err) => <b>{`Error: ${err.toString()}`}</b>,
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleDeleteClick = (item) => setItemToDelete(item);

  const confirmDelete = () => {
    if (!itemToDelete) return;
    const apiCall = fetch(`http://localhost:9000/foods/${itemToDelete.id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal menghapus di server.");
        return res.json();
      })
      .then((result) => {
        if (result.status === "success") {
          setFoodItems(foodItems.filter((item) => item.id !== itemToDelete.id));
        } else {
          throw new Error(result.message || "Gagal menghapus.");
        }
      })
      .finally(() => {
        setItemToDelete(null); // Tutup modal setelah selesai
      });

    toast.promise(apiCall, {
      loading: "Menghapus...",
      success: <b>Berhasil dihapus!</b>,
      error: <b>Gagal menghapus.</b>,
    });
  };

  const handleDeleteAll = () => {
    const deletePromises = foodItems.map((item) =>
      fetch(`http://localhost:9000/foods/${item.id}`, { method: "DELETE" }).then((response) => {
        if (!response.ok) {
          // Jika satu saja gagal, seluruh proses akan dianggap error oleh toast
          throw new Error(`Gagal menghapus ${item.name}`);
        }
        return response.json();
      })
    );

    const promiseCall = Promise.all(deletePromises).then(() => {
      // Jika semua promise berhasil, baru update UI
      setFoodItems([]);
    });

    toast.promise(promiseCall, {
      loading: "Menghapus semua makanan...",
      success: <b>Semua makanan berhasil dihapus!</b>,
      error: <b>Terjadi kesalahan saat menghapus data.</b>,
    });

    setIsDeleteAllModalOpen(false); // Langsung tutup modal
  };

  const handleEdit = (food) => {
    setEditingId(food.id);
    setCategory({ value: food.category, label: food.category });
    setName({ value: food.name, label: food.name });
    setQuantity(food.quantity);
    setUnit({ value: food.unit, label: food.unit });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setCategory(null);
    setName(null);
    setQuantity(1);
    setUnit(null);
  };

  const categoryOptions = foodCategories.map((cat) => ({ value: cat, label: cat }));
  const nameOptions = category ? (foodNames[category.value] || []).map((name) => ({ value: name, label: name })) : [];
  const unitOptions = units.map((u) => ({ value: u, label: u }));
  const getCategoryColor = (cat) => ({ Karbohidrat: "bg-red-100 text-red-800", Protein: "bg-blue-100 text-blue-800", Sayur: "bg-green-100 text-green-800", Buah: "bg-yellow-100 text-yellow-800" }[cat] || "bg-gray-100 text-gray-800");

  if (isMlLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <h1 className="text-2xl font-semibold text-gray-700">Memuat Model Analisis...</h1>
          <p className="text-gray-500">Harap tunggu sebentar, ini hanya butuh beberapa detik.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 pt-8 md:pt-29">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Food Tracker</h1>
          <p className="text-gray-600">Pantau nutrisi harian Anda dengan analisis cerdas secara real-time.</p>
          {mlError && <p className="mt-2 p-2 text-center text-red-800 bg-red-100 rounded-lg">{mlError}</p>}
        </div>

        {/* --- FORM --- */}
        <div className="bg-white backdrop-blur-sm bg-opacity-90 shadow-xl rounded-2xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-gray-800">{editingId ? "Edit Makanan" : "Tambah Makanan"}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
              <Select
                menuPortalTarget={document.body}
                styles={portalStyles}
                options={categoryOptions}
                value={category}
                onChange={(option) => {
                  setCategory(option);
                  setName(null);
                }}
                placeholder="Cari & pilih kategori..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Makanan</label>
              <Select
                menuPortalTarget={document.body}
                styles={portalStyles}
                options={nameOptions}
                value={name}
                onChange={setName}
                // --- PERBAIKAN DI SINI ---
                placeholder={category ? "Cari & pilih makanan..." : "Pilih kategori dahulu..."}
                isDisabled={!category}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah</label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Satuan</label>
              <Select menuPortalTarget={document.body} styles={portalStyles} options={unitOptions} value={unit} onChange={setUnit} placeholder="Pilih satuan..." />
            </div>
          </div>
          <div className="flex space-x-4 mt-8">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Menyimpan..." : editingId ? "Update Makanan" : "Simpan Makanan"}
            </button>
            {editingId && (
              <button onClick={resetForm} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold transition-all">
                Batal
              </button>
            )}
          </div>
        </div>

        {/* --- DAFTAR MAKANAN --- */}
        <div className="bg-white backdrop-blur-sm bg-opacity-90 shadow-xl rounded-2xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-teal-500 rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-gray-800">Daftar Makanan Dikonsumsi</h2>
            </div>
            {/* Tombol Hapus Semua (hanya muncul jika ada item) */}
            {foodItems.length > 0 && (
              <button onClick={() => setIsDeleteAllModalOpen(true)} className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition-colors" title="Hapus semua makanan">
                Hapus Semua
              </button>
            )}
            {isAnalyzing && (
              <div className="flex items-center">
                <svg className="animate-spin h-5 w-5 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="ml-2 text-sm text-gray-500">Menganalisis ulang...</span>
              </div>
            )}
          </div>
          {foodItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">Belum ada makanan yang ditambahkan.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {foodItems.map((item) => (
                <div key={item.id} className="group bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>{item.category}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all" title="Edit">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button onClick={() => handleDeleteClick(item)} className="p-2 text-red-500 rounded-lg hover:bg-red-50 hover:text-red-700 transition-all" title="Hapus">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- HASIL ANALISIS --- */}
        <div className="bg-white backdrop-blur-sm bg-opacity-90 shadow-xl rounded-2xl p-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-gray-800">Hasil Analisis Nutrisi</h2>
          </div>
          {analysisResult ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <div className="relative w-64 h-64 mb-6">
                  <canvas ref={chartRef}></canvas>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-800">{analysisResult.totalCalories}</span>
                    <span className="text-sm text-gray-600">KCAL</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-x-2 gap-y-2 w-full max-w-md text-center">
                  <div className="flex items-center justify-center space-x-2 p-2 rounded-lg bg-red-50">
                    <div className="w-3 h-3 bg-[#FF6B6B] rounded-full"></div>
                    <span className="text-xs text-gray-700">Karbo {analysisResult.karbohidratGrams}g</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 p-2 rounded-lg bg-teal-50">
                    <div className="w-3 h-3 bg-[#4ECDC4] rounded-full"></div>
                    <span className="text-xs text-gray-700">Protein {analysisResult.proteinGrams}g</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 p-2 rounded-lg bg-blue-50">
                    <div className="w-3 h-3 bg-[#45B7D1] rounded-full"></div>
                    <span className="text-xs text-gray-700">Lemak {analysisResult.lemakGrams}g</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Rekomendasi</h3>
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200 mb-6">
                  <p className="text-gray-700 leading-relaxed">{analysisResult.recommendation}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 text-center border border-blue-200">
                    <div className="text-xl md:text-2xl font-bold text-blue-600">{analysisResult.totalCalories}</div>
                    <div className="text-xs md:text-sm text-gray-600">Total Kalori (KCAL)</div>
                  </div>
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 text-center border border-red-200">
                    <div className="text-xl md:text-2xl font-bold text-red-600">{analysisResult.karbohidratGrams}g</div>
                    <div className="text-xs md:text-sm text-gray-600">Karbohidrat</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-4 text-center border border-green-200">
                    <div className="text-xl md:text-2xl font-bold text-green-600">{analysisResult.proteinGrams}g</div>
                    <div className="text-xs md:text-sm text-gray-600">Protein</div>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 text-center border border-yellow-200">
                    <div className="text-xl md:text-2xl font-bold text-yellow-600">{analysisResult.lemakGrams}g</div>
                    <div className="text-xs md:text-sm text-gray-600">Lemak</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  ></path>
                </svg>
              </div>
              <p className="text-gray-500 text-lg">Analisis nutrisi akan muncul di sini.</p>
              <p className="text-gray-400">Tambahkan makanan di atas untuk memulai.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- MODAL KONFIRMASI HAPUS --- */}
      {itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm text-center transform transition-all scale-100">
            <h3 className="text-xl font-bold mb-4">Anda Yakin?</h3>
            <p className="text-gray-600 mb-8">
              Anda akan menghapus <span className="font-semibold">{itemToDelete.name}</span>. Aksi ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-center space-x-4">
              <button onClick={() => setItemToDelete(null)} className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold transition-colors">
                Batal
              </button>
              <button onClick={confirmDelete} className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- MODAL KONFIRMASI HAPUS SEMUA --- */}
      {isDeleteAllModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm text-center transform transition-all scale-100">
            <h3 className="text-xl font-bold mb-4">Hapus Semua Makanan?</h3>
            <p className="text-gray-600 mb-8">Anda yakin ingin menghapus seluruh daftar makanan? Aksi ini tidak dapat dibatalkan.</p>
            <div className="flex justify-center space-x-4">
              <button onClick={() => setIsDeleteAllModalOpen(false)} className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold transition-colors">
                Batal
              </button>
              <button
                onClick={handleDeleteAll} // Fungsi ini akan kita buat selanjutnya
                className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
              >
                Ya, Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracker;
