'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Upload, AlertCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (base64Image: string) => void;
  onUpload: (file: File) => void;
  onScenarioSelect: (scenarioId: string) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
  onUpload,
  onScenarioSelect,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [streamActive, setStreamActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isProcessing, setIsProcessing] = useState(false);

  // Start Real Browser Camera
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser. Please use image upload or scenario presets.');
      }

      // Stop existing stream if running
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((t) => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreamActive(true);
      }
    } catch (err: any) {
      console.warn('Camera access note:', err.message);
      setCameraError(err.message || 'Camera permission denied or camera device unavailable. Use image upload or quick demo presets.');
      setStreamActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setStreamActive(false);
  };

  const toggleCameraFlip = () => {
    setFacingMode(facingMode === 'environment' ? 'user' : 'environment');
  };

  useEffect(() => {
    if (streamActive) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [facingMode]);

  // Capture frame to canvas
  const handleCaptureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

    setCapturedImage(dataUrl);
    stopCamera();

    const base64Data = dataUrl.split(',')[1];
    onCapture(base64Data);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  // Drag and drop or file upload
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCapturedImage(reader.result as string);
        const base64Data = (reader.result as string).split(',')[1];
        onCapture(base64Data);
      };
      reader.readAsDataURL(file);
      onUpload(file);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl border border-gov-border shadow-sm p-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gov-green"></span>
            <h3 className="text-base font-bold text-gov-navy tracking-tight uppercase">
              Multimodal Product Scanner
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Use live camera capture, drag-and-drop packaging image, or quick-test with demo scenarios.
          </p>
        </div>

        {/* 5 Scenario Presets for Judge Demonstration */}
        <div className="flex items-center space-x-1.5 flex-wrap gap-1.5">
          <span className="text-[10px] font-black text-slate-500 uppercase mr-1">Demo Scenarios:</span>
          <button
            onClick={() => onScenarioSelect('scenario-1-led-lamp')}
            className="px-3 py-1 text-xs rounded-full bg-amber-50 hover:bg-amber-500 hover:text-white border-2 border-amber-300 text-amber-900 font-bold transition-all shadow-sm"
          >
            💡 1. LED Lamp
          </button>
          <button
            onClick={() => onScenarioSelect('scenario-2-jewellery')}
            className="px-3 py-1 text-xs rounded-full bg-yellow-50 hover:bg-yellow-500 hover:text-white border-2 border-yellow-400 text-yellow-900 font-bold transition-all shadow-sm"
          >
            👑 2. Gold (HUID)
          </button>
          <button
            onClick={() => onScenarioSelect('scenario-3-cement')}
            className="px-3 py-1 text-xs rounded-full bg-orange-50 hover:bg-orange-500 hover:text-white border-2 border-orange-300 text-orange-900 font-bold transition-all shadow-sm"
          >
            🏗️ 3. Cement (OPC)
          </button>
          <button
            onClick={() => onScenarioSelect('scenario-4-steel')}
            className="px-3 py-1 text-xs rounded-full bg-indigo-50 hover:bg-indigo-600 hover:text-white border-2 border-indigo-300 text-indigo-900 font-bold transition-all shadow-sm"
          >
            🔩 4. Steel (TMT)
          </button>
          <button
            onClick={() => onScenarioSelect('scenario-5-electrical-iron')}
            className="px-3 py-1 text-xs rounded-full bg-purple-50 hover:bg-purple-600 hover:text-white border-2 border-purple-300 text-purple-900 font-bold transition-all shadow-sm"
          >
            ⚡ 5. Electric Iron
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Camera Preview / Snapshot */}
        <div className="lg:col-span-2">
          <div className="relative w-full aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-700 flex items-center justify-center">
            {/* Live Video Stream */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${streamActive && !capturedImage ? 'block' : 'hidden'}`}
            />

            {/* Captured Still Preview */}
            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captured Product"
                className="w-full h-full object-contain bg-black"
              />
            )}

            {/* Hidden Processing Canvas */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Default State before camera starts */}
            {!streamActive && !capturedImage && (
              <div className="text-center p-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center mx-auto border border-slate-700">
                  <Camera className="w-7 h-7 text-gov-saffronLight" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-200">Camera Inactive</div>
                  <div className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Click 'Start Camera' below to scan a product rating label in real-time, or upload an image.
                  </div>
                </div>
                <button
                  onClick={startCamera}
                  className="px-4 py-2 bg-gov-green hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-md transition-colors"
                >
                  Start Camera
                </button>
              </div>
            )}

            {/* Crosshair Scanner Guide Overlay */}
            {streamActive && !capturedImage && (
              <div className="absolute inset-0 pointer-events-none border-2 border-emerald-500/40 rounded-xl flex items-center justify-center">
                <div className="w-3/4 h-3/4 border-2 border-dashed border-emerald-400/80 rounded-lg flex items-center justify-center">
                  <span className="text-[11px] font-mono text-emerald-300 bg-slate-900/80 px-2 py-0.5 rounded">
                    Align rating plate / ISI Mark / HUID inside frame
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Camera Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
            <div className="flex items-center space-x-2">
              {streamActive && !capturedImage && (
                <>
                  <button
                    onClick={handleCaptureFrame}
                    className="px-4 py-2 bg-gov-saffron hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs shadow transition-colors flex items-center gap-1.5"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capture Frame</span>
                  </button>
                  <button
                    onClick={toggleCameraFlip}
                    title="Flip Camera (Front/Back)"
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium border border-slate-300"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={stopCamera}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium border border-slate-300"
                  >
                    Stop
                  </button>
                </>
              )}

              {capturedImage && (
                <button
                  onClick={handleRetake}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs border border-slate-300 transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retake / Restart Camera</span>
                </button>
              )}

              {!streamActive && !capturedImage && (
                <button
                  onClick={startCamera}
                  className="px-4 py-2 bg-gov-green hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs shadow transition-colors flex items-center gap-1.5"
                >
                  <Camera className="w-4 h-4" />
                  <span>Open Camera</span>
                </button>
              )}
            </div>

            {cameraError && (
              <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate max-w-xs">{cameraError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Drag and Drop Upload Fallback */}
        <div className="flex flex-col justify-between p-4 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 rounded-xl border-2 border-slate-200">
          <div>
            <div className="text-xs font-black text-gov-navy uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-amber-600" />
              <span>Upload Packaging / Label Photo</span>
            </div>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed font-medium">
              If camera is unavailable, select or drop a photo of the product rating plate, label, or packaging.
            </p>

            <label className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/50 hover:bg-amber-50 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all block text-center shadow-inner group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-6 h-6" />
              </div>
              <span className="text-xs font-black text-gov-navy group-hover:text-amber-800">Click to browse file</span>
              <span className="text-[10px] text-slate-500 font-medium mt-1">Supports JPG, PNG, WEBP (Max 15MB)</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
            <div className="font-semibold text-slate-700 mb-1">OCR & Feature Detection:</div>
            <ul className="space-y-1 list-disc list-inside text-slate-600">
              <li>Detects ISI Mark & 7-10 digit CM/L number</li>
              <li>Detects 6-digit alphanumeric HUID for Gold</li>
              <li>Extracts rated wattage, voltage & frequency</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
