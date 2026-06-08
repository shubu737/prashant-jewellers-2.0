/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Upload,
  Star,
  MapPin,
  Phone,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Flame,
  Award,
  Users
} from 'lucide-react';
import { useSound } from '../hooks/useSound';

// Timestamps matching the user's uploaded video
const TOUR_HIGHLIGHTS = [
  {
    time: '0:00',
    seconds: 0,
    title: 'The Royal Facade',
    text: 'Imposing bronze exterior featuring "Dhan Dhan Satguru Tera Hi Aasaa" and "since 1957" legacy.',
    iconName: 'Award'
  },
  {
    time: '0:06',
    seconds: 6,
    title: 'Showroom Ambience',
    text: 'A luxury interior lounge where clients are served like cherished family elders.',
    iconName: 'Users'
  },
  {
    time: '0:13',
    seconds: 13,
    title: 'Expert Custom Services',
    text: 'Experience precise on-site ear-piercing & master designs made to individual order.',
    iconName: 'Sparkles'
  },
  {
    time: '0:25',
    seconds: 25,
    title: 'Ornaments Exhibition',
    text: 'Breathtaking heavy gold necklaces, custom bangles, and sterling silver accessories.',
    iconName: 'Flame'
  },
  {
    time: '0:42',
    seconds: 42,
    title: '5.0★ Google Accolade',
    text: 'Highly rated and celebrated as Rawatbhata\'s most trusted jewelry destination.',
    iconName: 'Star'
  }
];

export default function ShowroomTour() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'rawatbhata' | 'rawatbhata2'>('rawatbhata');
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { playLuxuryChime } = useSound();

  // Set default beautiful ambient video on start if nothing is loaded
  useEffect(() => {
    setVideoSrc('/showroom-tour.mp4');
  }, []);

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => {
        console.log('Automated play was delayed or blocked, click play to manual-start.', e);
      });
    }
  }, [videoSrc]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => console.log('Video play error:', err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setProgress((current / dur) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    videoRef.current.currentTime = percentage * videoRef.current.duration;
    setProgress(percentage * 100);
  };

  const seekTo = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
    playLuxuryChime();
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Drag and drop video upload handling so the user can browse their actual video
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processVideoFile = (file: File) => {
    if (file && file.type.startsWith('video/')) {
      const fileUrl = URL.createObjectURL(file);
      setVideoSrc(fileUrl);
      setIsPlaying(false);
      setProgress(0);
      playLuxuryChime();
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processVideoFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processVideoFile(e.target.files[0]);
    }
  };

  const triggerFileBrowser = () => {
    fileInputRef.current?.click();
  };

  // Convert current format for tracking timer representation
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section
      id="showroom-tour"
      className="relative overflow-hidden bg-neutral-950 py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-900"
    >
      {/* Visual luxury gold dust and lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        
        {/* Editorial Heading Structure */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 text-[#D4AF37]">
            <span className="h-px w-6 bg-[#D4AF37]" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase font-semibold">Virtual Walkthrough</span>
            <span className="h-px w-6 bg-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-3.5xl font-light tracking-wide text-white sm:text-5xl">
            Experience Our <span className="font-serif font-bold italic text-[#D4AF37]">Boutique Interiors</span>
          </h2>
          <p className="font-sans text-xs uppercase tracking-widest text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Take a cinematic visual tour of our showroom. Discover the fine hallmarks of Rajasthani trust, expert gold craftsmanship, and luxurious consulting galleries.
          </p>
        </div>

        {/* Elegant spacing divider */}
        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent mx-auto mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (SPAN 7): High-fidelity customized Video Player */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Custom Interactive Player Container */}
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`relative aspect-video w-full rounded-sm border overflow-hidden bg-black transition-all duration-300 ${
                dragActive ? 'border-[#D4AF37] scale-[1.01] shadow-[0_0_20px_rgba(212,175,55,0.15)]' : 'border-zinc-800 shadow-2xl'
              }`}
            >
              {videoSrc ? (
                <>
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onClick={handlePlayPause}
                    className="w-full h-full object-cover cursor-pointer"
                    playsInline
                    loop
                    autoPlay
                    muted={isMuted}
                  />

                  {/* Centered Play Button Overlay when paused */}
                  <AnimatePresence>
                    {!isPlaying && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={handlePlayPause}
                        className="absolute inset-0 flex items-center justify-center bg-black/45 cursor-pointer z-10 hover:bg-black/30 transition-all duration-300"
                      >
                        <div className="h-16 w-16 flex items-center justify-center rounded-full border border-[#D4AF37]/50 bg-black/90 text-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:scale-105 transition-transform">
                          <Play className="h-8 w-8 fill-[#D4AF37] ml-1" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Deep custom controls bar overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col space-y-2.5 z-20 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
                    
                    {/* Scrub bar */}
                    <div 
                      onClick={handleProgressBarClick}
                      className="relative h-1 w-full bg-zinc-800 cursor-pointer rounded-full overflow-hidden hover:h-1.5 transition-all"
                    >
                      <div 
                        style={{ width: `${progress}%` }}
                        className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-400 to-[#D4AF37] rounded-full"
                      />
                    </div>

                    {/* HUD Controls */}
                    <div className="flex items-center justify-between text-white text-xs">
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={handlePlayPause}
                          className="hover:text-[#D4AF37] cursor-pointer transition-colors"
                        >
                          {isPlaying ? <Pause className="h-4.5 w-4.5 text-[#D4AF37]" /> : <Play className="h-4.5 w-4.5" />}
                        </button>
                        
                        <button 
                          onClick={handleMuteToggle}
                          className="hover:text-[#D4AF37] cursor-pointer transition-colors"
                        >
                          {isMuted ? <VolumeX className="h-4.5 w-4.5 text-zinc-500" /> : <Volume2 className="h-4.5 w-4.5" />}
                        </button>

                        <span className="font-mono text-[10px] text-zinc-400">
                          {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold font-sans hidden sm:inline">
                          Rawatbhata Tour Walkthrough
                        </span>
                        <button 
                          onClick={handleFullscreen}
                          className="hover:text-[#D4AF37] cursor-pointer transition-colors"
                          title="Cinema Mode"
                        >
                          <Maximize2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <Upload className="h-10 w-10 text-zinc-600 animate-pulse" />
                  <p className="font-serif text-sm text-zinc-400">No Custom Walkthrough Loaded</p>
                </div>
              )}

              {/* Upload Drop overlay hint */}
              {dragActive && (
                <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center border-2 border-dashed border-[#D4AF37] z-30 pointer-events-none">
                  <Upload className="h-12 w-12 text-[#D4AF37] mb-2" />
                  <p className="font-serif text-base text-[#D4AF37] font-semibold">Drop Your Store Walkthrough Video Here</p>
                  <p className="text-[10px] font-sans text-zinc-500 uppercase tracking-widest mt-1">Accepts any MP4 files</p>
                </div>
              )}
            </div>

            {/* Drag & Drop instruction bar */}
            <div className="flex flex-col sm:flex-row items-center sm:justify-between p-4 border border-zinc-900 bg-neutral-900/40 rounded-sm space-y-4 sm:space-y-0">
              <div className="space-y-1 text-center sm:text-left">
                <p className="font-serif text-xs font-semibold text-white">Have the original Rawatbhata showroom video file?</p>
                <p className="font-sans text-[10px] text-zinc-500">Drag & drop your store MP4 file inside the player above, or click browse to import.</p>
              </div>
              <button
                onClick={triggerFileBrowser}
                className="inline-flex items-center space-x-2 border border-[#D4AF37]/50 hover:border-[#D4AF37] bg-[#050505] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:font-bold text-[10px] tracking-widest uppercase font-semibold px-4.5 py-2.5 cursor-pointer transition-all duration-300"
              >
                <Upload className="h-3 w-3" />
                <span>Browse Video</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="video/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>

          </div>

          {/* Right Column (SPAN 5): Dynamic Location Details, Highlights & Review Card */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Flagship Showroom Location Info Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="border border-[#D4AF37]/20 p-6 bg-neutral-900/30 rounded-sm relative"
            >
              <div className="absolute top-0 right-0 bg-[#D4AF37]/10 text-[#D4AF37] border-b border-l border-[#D4AF37]/20 text-[8px] uppercase tracking-widest px-3 py-1 font-mono font-semibold">
                Flagship HQ Since 1957
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-zinc-400">
                  <MapPin className="h-4.5 w-4.5 text-[#D4AF37]" />
                  <span className="font-serif text-xs font-semibold uppercase tracking-wider text-white">RAWATBHATA BOUTIQUE</span>
                </div>

                <h3 className="font-serif text-xl font-light text-white leading-snug">
                  Shop No. 2, Shopping Complex, <br />
                  <span className="font-serif font-semibold italic text-[#D4AF37]">Rawatbhata, Rajasthan - 323307</span>
                </h3>

                {/* Highly Celebrated Google Maps Ratings shown in video */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-zinc-800 bg-[#060606] rounded-sm space-y-3 sm:space-y-0">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3.5 w-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                      <Star className="h-3.5 w-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                      <Star className="h-3.5 w-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                      <Star className="h-3.5 w-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                      <Star className="h-3.5 w-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                      <span className="font-mono text-xs text-white font-bold ml-1">5.0</span>
                    </div>
                    <p className="text-[10px] font-sans tracking-tight text-zinc-400 font-medium">174+ Verified Google Reviews</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-widest bg-emerald-900/30 px-2 py-0.5 border border-emerald-500/20 text-emerald-400 font-mono font-semibold">
                      TOP RATED NEAR LAB
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono border-t border-zinc-900 pt-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-zinc-500 block uppercase font-sans tracking-wide">Contacts</span>
                    <a href="tel:+919680077124" className="text-zinc-300 hover:text-[#D4AF37] transition-colors block">N. Soni: 9680077124</a>
                    <a href="tel:+919414444025" className="text-zinc-300 hover:text-[#D4AF37] transition-colors block">K. Soni: 9414444025</a>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-zinc-500 block uppercase font-sans tracking-wide">Operating Hours</span>
                    <span className="text-zinc-300 block">Mon - Sat: 11:00 AM - 9:00 PM</span>
                    <span className="text-amber-500 block">Sunday: Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Video Timestamp bookmarks mapping with interactive seek-on-click */}
            <div className="space-y-4">
              <h4 className="font-serif text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                Grand Tour Highlights
              </h4>
              
              <div className="space-y-3">
                {TOUR_HIGHLIGHTS.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={() => seekTo(item.seconds)}
                      className="group flex items-start space-x-4 border border-zinc-900 p-3 bg-neutral-900/10 hover:border-[#D4AF37]/30 hover:bg-[#080808] rounded-sm cursor-pointer transition-all duration-300"
                    >
                      <div className="flex-shrink-0 font-mono text-[10px] px-2 py-1 border border-zinc-800 text-[#D4AF37] bg-black rounded-sm group-hover:border-[#D4AF37]/40">
                        {item.time}
                      </div>
                      <div className="flex-grow space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                            {item.title}
                          </span>
                          <ChevronRight className="h-3 w-3 text-zinc-600 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
                        </div>
                        <p className="font-sans text-[11px] leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
