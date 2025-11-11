import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import "./styles.css";


const blueUp = "#3B81E3";
const blue = "#5E98E8";
const yellowUp = "#DAA044";
const yellow = "#E1B266";
const redUp = "#C75A57";
const red = "#D17875";
const green = "#4ED063";
const lightgreen = "#6ED880";
const purple = "#8B5BC2";
const lightpurple = "#A079CD";
const orangeUp = "#E37C39";
const orange = "#FF9950";
const grey = "#b9b8b8ff"
const upArrow = "./public/arrow-big-up.png"
const downArrow = "./public/arrow-big-down.png"
const downArrowImg = document.getElementById("downArrow");

/* ---------- sample data ---------- */
const SAMPLE_SONGS = [
  {
    id: "banana",
    title: "Banana",
    artist: "Stony Pony",
    genre: "Jazz",
    audioUrl: "./audio/Banana by Stony Pony.wav",
    albumArt: "./audio/banana.jpg",
    regions: [
      { id: "intro", label: "Intro", start: 0, end: 12.4, color: "rgba(96,165,250,0.25)" },
      { id: "theme", label: "Theme", start: 12.4, end: 52.0, color: "rgba(34,197,94,0.25)" },
      { id: "solo1", label: "Solo 1", start: 52.0, end: 130.5, color: "rgba(245,158,11,0.25)" },
    ],
  },
  {
    id: "check-it-out",
    title: "check it out",
    artist: "phoebemonster",
    genre: "Pop",
    audioUrl: "./audio/check it out by phoebemonster.wav",
    albumArt: "./audio/hit different by phoebemonster.jpg",
    regions: [
      { label: "···", start: 0.0, end: 8.4, color: grey, size: "large" },
      { label: "S1", start: 8.4, end: 16.3, color: blue, size: "large" },
      { label: "↑", start: 16.3, end: 24.5, color: blue, size: "small" },
      { label: "B1", start: 24.5, end: 38.5, color: yellow, size: "large" },
      { label: "↓", start: 38.5, end: 39.5, color: green, size: "small" },
      { label: "W", start: 39.5, end: 40.5, color: green, size: "small" },
      { label: "···", start: 40.5, end: 48.5, color: grey, size: "large" },
      { label: "A1", start: 48.5, end: 72.5, color: red, size: "large" },
      { label: "···", start: 72.5, end: 84.4, color: grey, size: "large" },
      { label: "S2", start: 84.4, end: 92.3, color: blue, size: "large" },
      { label: "↑", start: 92.3, end: 100.5, color: blue, size: "small" },
      { label: "B2", start: 100.5, end: 114.5, color: yellow, size: "large" },
      { label: "↓", start: 114.5, end: 115.6, color: green, size: "small" },
      { label: "W", start: 115.6, end: 116.6, color: green, size: "small" },
      { label: "A2", start: 116.5, end: 150, color: red, size: "large" }
    ],
  },
  {
    id: "go-outside",
    title: "Go Outside",
    artist: "Spin",
    genre: "Pop",
    audioUrl: "./audio/Go Outside by Spin.wav",
    albumArt: "./audio/go outside cover.jpg",
    regions: [
      { label: "S1", start: 8.4, end: 16.3, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↑", start: 16.3, end: 24.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "B1", start: 24.5, end: 38.5, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↓", start: 38.5, end: 39.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "W", start: 39.5, end: 40.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "A1", start: 48.5, end: 72.5, color: "rgba(34,197,94,0.25)", size: "large" },
      { label: "S2", start: 84.4, end: 92.3, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↑", start: 92.3, end: 100.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "B2", start: 100.5, end: 38.5, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↓", start: 114.5, end: 39.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "W", start: 115.6, end: 40.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "A2", start: 116.5, end: 72.5, color: "rgba(34,197,94,0.25)", size: "large" }
    ],
  },
  {
    id: "on-the-moon",
    title: "On The Moon",
    artist: "Spin",
    genre: "Dance",
    genre2: ["Beats", "Electronic", "Pop", "Rock"],
    audioUrl: "./audio/On The Moon by Spin.wav",
    albumArt: "./audio/go outside cover.jpg",
    regions: [
      { label: "S1", start: 8.4, end: 16.3, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↑", start: 16.3, end: 24.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "B1", start: 24.5, end: 38.5, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↓", start: 38.5, end: 39.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "W", start: 39.5, end: 40.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "A1", start: 48.5, end: 72.5, color: "rgba(34,197,94,0.25)", size: "large" },
      { label: "S2", start: 84.4, end: 92.3, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↑", start: 92.3, end: 100.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "B2", start: 100.5, end: 38.5, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↓", start: 114.5, end: 39.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "W", start: 115.6, end: 40.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "A2", start: 116.5, end: 72.5, color: "rgba(34,197,94,0.25)", size: "large" }
    ],
  },
  {
    id: "jet-set-static",
    title: "Jet Set Static",
    artist: "Spin",
    genre: "Pop",
    audioUrl: "./audio/Jet Set Static by Spin.wav",
    albumArt: "./audio/go outside cover.jpg",
    regions: [
      { label: "S1", start: 8.4, end: 16.3, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↑", start: 16.3, end: 24.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "B1", start: 24.5, end: 38.5, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↓", start: 38.5, end: 39.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "W", start: 39.5, end: 40.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "A1", start: 48.5, end: 72.5, color: "rgba(34,197,94,0.25)", size: "large" },
      { label: "S2", start: 84.4, end: 92.3, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↑", start: 92.3, end: 100.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "B2", start: 100.5, end: 38.5, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↓", start: 114.5, end: 39.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "W", start: 115.6, end: 40.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "A2", start: 116.5, end: 72.5, color: "rgba(34,197,94,0.25)", size: "large" }
    ],
  },
  {
    id: "tleilax",
    title: "Tleilax",
    artist: "Graham Barton",
    genre: "Beats",
    audioUrl: "./audio/Tleilax by Graham Barton.wav",
    albumArt: "./audio/tleilax cover.jpg",
    regions: [
      { label: "S1", start: 8.4, end: 16.3, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↑", start: 16.3, end: 24.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "B1", start: 24.5, end: 38.5, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↓", start: 38.5, end: 39.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "W", start: 39.5, end: 40.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "A1", start: 48.5, end: 72.5, color: "rgba(34,197,94,0.25)", size: "large" },
      { label: "S2", start: 84.4, end: 92.3, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↑", start: 92.3, end: 100.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "B2", start: 100.5, end: 38.5, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↓", start: 114.5, end: 39.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "W", start: 115.6, end: 40.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "A2", start: 116.5, end: 72.5, color: "rgba(34,197,94,0.25)", size: "large" }
    ],
  },
  {
    id: "gotta-be-me",
    title: "Gotta Be Me",
    artist: "1 Luv",
    genre: "Beats",
    audioUrl: "./audio/Gotta Be Me by 1 Luv.wav",
    albumArt: "./audio/Gotta Be Me by 1 Luv.JPG",
    regions: [
      { label: "···", start: 0, end: 2.3, color: grey, size: "large" },
      { label: "S1", start: 2.3, end: 11.7, color: blue, size: "large" },
      { label: "↑", start: 11.7, end: 21.2, color: blueUp, size: "small" },
      { label: "B1", start: 21.2, end: 28.1, color: yellow, size: "large" },
      { label: "↓", start: 28.1, end: 29.4, color: green, size: "small" },
      { label: "W", start: 29.4, end: 30.5, color: purple, size: "small" },
      { label: "A1", start: 30.5, end: 49.5, color: red, size: "large" },
      { label: "···", start: 49.5, end: 51.7, color: grey, size: "large" },
      { label: "S2", start: 51.7, end: 61.0, color: blue, size: "large" },
      { label: "↑", start: 61.0, end: 70.8, color: blueUp, size: "small" },
      { label: "B2", start: 70.8, end: 77.7, color: yellow, size: "large" },
      { label: "↓", start: 77.7, end: 78.8, color: green, size: "small" },
      { label: "W", start: 78.8, end: 80, color: purple, size: "small" },
      { label: "A2", start: 80, end: 96.5, color: red, size: "large" },
      { label: "↓", start: 96.5, end: 97.6, color: green, size: "small" },
      { label: "W", start: 97.6, end: 98.8, color: purple, size: "small" },
      { label: "↑", start: 98.8, end: 117.5, color: redUp, size: "small" },
    ],
  },
  {
    id: "show-em-whatcha-got",
    title: "Show Em Whatcha Got",
    artist: "Suede Brigade",
    genre: "Rock",
    audioUrl: "./audio/Show Em Whatcha Got by Suede Brigade.wav",
    albumArt: "./audio/Show Em Whatcha Got By Suede Brigade.jpg",
    regions: [
      { label: "···", start: 0, end: 5.5, color: grey, size: "large" },
      { label: "S1", start: 5.6, end: 17.2, color: blue, size: "large" },
      { label: "↑", start: 17.2, end: 25.5, color: blueUp, size: "small" },
      { label: "↓", start: 25.5, end: 28.2, color: green, size: "small" },
      { label: "B1", start: 28.2, end: 37.9, color: yellow, size: "large" },
      { label: "↓", start: 37.9, end: 39.2, color: green, size: "small" },
      { label: "A1", start: 39.2, end: 50.1, color: red, size: "large" },
      { label: "↑", start: 50.1, end: 61.3, color: redUp, size: "small" },
      { label: "···", start: 61.3, end: 66.5, color: grey, size: "large" },
      { label: "S2", start: 66.5, end: 74.5, color: blue, size: "large" },
      { label: "↓", start: 74.5, end: 76.3, color: green, size: "small" },
      { label: "W", start: 76.3, end: 77.5, color: purple, size: "small" },
      { label: "B2", start: 77.5, end: 87.3, color: yellow, size: "large" },
      { label: "↓", start: 87.3, end: 88.5, color: green, size: "small" },
      { label: "A2", start: 88.5, end: 99.5, color: red, size: "large" },
      { label: "↑", start: 99.5, end: 108.9, color: redUp, size: "small" },
      { label: "↓", start: 108.9, end: 110.5, color: green, size: "small" },
      { label: "B3", start: 110.5, end: 126.9, color: yellow, size: "large" },
      { label: "↓", start: 126.9, end: 129.9, color: green, size: "small" },
      { label: "A3", start: 129.9, end: 146, color: red, size: "large" },
      { label: "↑", start: 146, end: 150, color: redUp, size: "small" },
      { label: "↓", start: 150, end: 154, color: green, size: "small" },
    ],
  },
  {
    id: "starts-right-here",
    title: "Starts Right Here",
    artist: "BRITELIFE",
    genre: "Indie",
    audioUrl: "./audio/Starts Right Here by BRITELIFE.wav",
    albumArt: "./audio/Starts Right Here by BRITELIFE.png",
    regions: [
      { label: "···", start: 0, end: 9, color: grey, size: "large" },
      { label: "S1", start: 9, end: 27.2, color: blue, size: "large" },
      { label: "B1", start: 27.2, end: 35.1, color: yellow, size: "large" },
      { label: "↓", start: 35.1, end: 36.2, color: green, size: "small" },
      { label: "A1", start: 36.2, end: 54.5, color: red, size: "large" },
      { label: "···", start: 54.5, end: 58.5, color: grey, size: "large" },
      { label: "W", start: 58.5, end: 58.9, color: purple, size: "small" },
      { label: "S2", start: 58.9, end: 77.1, color: blue, size: "large" },
      { label: "B2", start: 77.1, end: 85, color: yellow, size: "large" },
      { label: "↓", start: 85, end: 86.1, color: green, size: "small" },
      { label: "A2", start: 86.1, end: 104.3, color: red, size: "large" },
      { label: "B3", start: 104.3, end: 121.3, color: yellow, size: "large" },
      { label: "↓", start: 121.3, end: 124.6, color: green, size: "small" },
      { label: "A3", start: 124.6, end: 152, color: red, size: "large" },
    ],
  },
  {
    id: "glitter-in-a-holorgram",
    title: "Glitter in a Hologram",
    artist: "Vivi Holo",
    genre: "Hyperpop",
    audioUrl: "./audio/Glitter in a Hologram by Vivi Holo.wav",
    albumArt: "./audio/Glitter in a Hologram by Vivi Holo.png",
    regions: [
      { label: "W", start: 0.5, end: 2.3, color: purple, size: "small" },
      { label: "···", start: 2.3, end: 8.5, color: grey, size: "large" },
      { label: "S1", start: 8.5, end: 16, color: blue, size: "large" },
      { label: "↑", start: 16, end: 23.2, color: blueUp, size: "small" },
      { label: "B1", start: 23.2, end: 37.6, color: yellow, size: "large" },
      { label: "↓", start: 37.6, end: 39.4, color: green, size: "small" },
      { label: "A1", start: 39.4, end: 53.7, color: red, size: "large" },
      { label: "↑", start: 53.7, end: 67.9, color: redUp, size: "small" },
      { label: "S2", start: 67.9, end: 75.1, color: blue, size: "large" },
      { label: "B2", start: 75.1, end: 89.5, color: yellow, size: "large" },
      { label: "↓", start: 89.5, end: 91.3, color: green, size: "small" },
      { label: "A2", start: 91.3, end: 105.6, color: red, size: "large" },
      { label: "↑", start: 105.6, end: 119, color: redUp, size: "small" },
      { label: "W", start: 119, end: 120, color: purple, size: "small" },
      { label: "B3", start: 120, end: 134.3, color: yellowUp, size: "large" },
      { label: "↓", start: 134.3, end: 135.2, color: green, size: "small" },
      { label: "A3", start: 135.2, end: 154, color: redUp, size: "large" },

    ],
  },
  {
    id: "python-piggyback",
    title: "Python Piggyback",
    artist: "GritViper",
    genre: "DnB",
    audioUrl: "./audio/Python Piggyback by GritViper.wav",
    albumArt: "./audio/Python Piggyback by GritViper.png",
    regions: [
      { label: "···", start: 0, end: 5.3, color: grey, size: "large" },
      { label: "S1", start: 5.3, end: 16, color: blue, size: "large" },
      { label: "↑", start: 16, end: 26.8, color: blueUp, size: "small" },
      { label: "B1", start: 26.8, end: 37.5, color: yellow, size: "large" },
      { label: "A1", start: 37.5, end: 48.2, color: red, size: "large" },
      { label: "↑", start: 48.2, end: 58.9, color: redUp, size: "small" },
      { label: "···", start: 58.9, end: 69.7, color: grey, size: "large" },
      { label: "S2", start: 69.7, end: 80.5, color: blue, size: "large" },
      { label: "↑", start: 80.5, end: 91.1, color: blueUp, size: "small" },
      { label: "B2", start: 91.1, end: 101.9, color: yellowUp, size: "large" },
      { label: "↓", start: 101.9, end: 103.2, color: green, size: "small" },
      { label: "A2", start: 103.2, end: 113.9, color: red, size: "large" },
      { label: "↑", start: 113.9, end: 124.5, color: redUp, size: "small" },
      { label: "↓", start: 124.5, end: 128, color: green, size: "small" },
    ],
  },
  {
    id: "pop-lock-boom",
    title: "Pop Lock Boom",
    artist: "ACE FAYE",
    genre: "Pop",
    audioUrl: "./audio/Pop Lock Boom by ACE FAYE.wav",
    albumArt: "./audio/Pop Lock Boom by ACE FAYE.JPG",
    regions: [
      { label: "···", start: 0, end: 4.1, color: grey, size: "large" },
      { label: "W", start: 4.1, end: 4.7, color: purple, size: "small" },
      { label: "S1", start: 4.7, end: 12.5, color: blue, size: "large" },
      { label: "↑", start: 12.5, end: 20.8, color: blueUp, size: "small" },
      { label: "B1", start: 20.8, end: 34.9, color: yellow, size: "large" },
      { label: "↓", start: 34.9, end: 36.6, color: green, size: "small" },
      { label: "W", start: 36.6, end: 37, color: purple, size: "small" },
      { label: "A1", start: 37, end: 46.2, color: red, size: "large" },
      { label: "↑", start: 46.2, end: 56.5, color: redUp, size: "small" },
      { label: "S2", start: 56.5, end: 64.3, color: blue, size: "large" },
      { label: "↑", start: 64.3, end: 72.6, color: blueUp, size: "small" },
      { label: "B2", start: 72.6, end: 86.9, color: yellow, size: "large" },
      { label: "↓", start: 86.9, end: 88.4, color: green, size: "small" },
      { label: "W", start: 88.4, end: 88.9, color: purple, size: "small" },
      { label: "A2", start: 88.9, end: 98, color: red, size: "large" },
      { label: "↑", start: 98, end: 106.2, color: redUp, size: "small" },
      { label: "B3", start: 106.2, end: 120.4, color: yellowUp, size: "large" },
      { label: "↓", start: 120.4, end: 122, color: green, size: "small" },
      { label: "W", start: 122, end: 122.4, color: purple, size: "small" },
      { label: "A3", start: 122.4, end: 131.6, color: red, size: "large" },
      { label: "↑", start: 131.6, end: 143, color: redUp, size: "small" },
    ],
  }
];

/* ---------- utils ---------- */
function formatTime(t) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
function makeSolid(c) {
  if (typeof c === "string" && c.endsWith("0.25)")) return c.replace("0.25)", "1)");
  if (typeof c === "string" && c.startsWith("rgba(")) {
    const p = c.slice(5, -1).split(",").map(s => s.trim());
    if (p.length === 4) return `rgb(${p[0]}, ${p[1]}, ${p[2]})`;
  }
  return c;
}

function parseToRgb(c) {
  if (!c) return null;
  if (c.startsWith("#")) {
    const hex = c.replace("#", "");
    const bigint = parseInt(hex.length === 3
      ? hex.split("").map(ch => ch + ch).join("")
      : hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  }
  // rgb/rgba( r, g, b [, a] )
  if (c.startsWith("rgb")) {
    const parts = c.slice(c.indexOf("(") + 1, c.indexOf(")"))
      .split(",")
      .map(s => s.trim());
    if (parts.length >= 3) {
      return [Number(parts[0]), Number(parts[1]), Number(parts[2])];
    }
  }
  return null;
}

function contrastTextColor(bg) {
  // fall back to white
  const rgb = parseToRgb(bg) || [255, 255, 255];
  // WCAG relative luminance
  const [r, g, b] = rgb.map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  // threshold ~0.5 gives good legibility on saturated fills
  return L > 0.5 ? "#111" : "#fff";
}


/* ---------- waveform (WaveSurfer) ---------- */
function WaveSurferWaveform({ audioRef, regions, height = 200, follow = false, onReady }) {
  // keep stable refs OUTSIDE effects
  const containerRef = useRef(null);
  const wsRef = useRef(null);
  const roRef = useRef(null);
  const displayDurationRef = useRef(null);
  const seekRafRef = useRef(null);

  // keep latest onReady without retriggering the effect
  const onReadyRef = useRef(onReady);
  useEffect(() => { onReadyRef.current = onReady; }, [onReady]);

  useEffect(() => {
    if (!containerRef.current || !audioRef?.current) return;

    const audio = audioRef.current;

    const setup = async () => {
      const { default: WaveSurfer } = await import("wavesurfer.js");
      // ⛔️ Remove this line from your file if it still exists:
      // const { default: RegionsPlugin } = await import("wavesurfer.js/dist/plugins/regions.esm.js");

      try { wsRef.current?.destroy(); } catch { }

      const ws = WaveSurfer.create({
        container: containerRef.current,
        height,
        media: audio,
        mediaControls: false,
        interact: true,
        fillParent: true,
        progressColor: "transparent",
        cursorColor: "#ffffff",
        cursorWidth: 3,

        renderFunction: (channels, ctx) => {
          // detect if this draw call is for the progress layer
          const part =
            ctx?.canvas?.parentElement?.getAttribute?.("part") ||
            ctx?.canvas?.closest?.("[part]")?.getAttribute?.("part") ||
            "";
          const isProgressLayer = part.includes("progress");

          const { width, height } = ctx.canvas;
          const dur = audio.duration || 1;
          const tNow = audio.currentTime || 0;
          const p = Math.max(0, Math.min(1, tNow / dur));

          if (isProgressLayer) {
            // optionally draw only the playhead line here, then bail
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "#fff";
            ctx.fillRect(Math.floor(width * p), 0, 1, height);
            return;
          }

          // --- BASE CANVAS DRAW ---
          ctx.clearRect(0, 0, width, height);

          // 1) Base waveform (bars)
          const peaks = channels[0];
          const barW = 3, gap = 1;
          const step = (peaks.length / width) * (barW + gap); // even sampling
          ctx.fillStyle = "#c1c1c1";

          for (let x = 0, i = 0; x < width; x += (barW + gap), i += step) {
            const idx = Math.max(0, Math.min(peaks.length - 1, Math.floor(i)));
            const amp = Math.abs(peaks[idx] || 0);
            const h = Math.max(1, amp * height);
            const y = (height - h) / 2;
            ctx.fillRect(x, y, barW, h);
          }

          // 2) Tint ALL regions (only where waveform pixels exist)
          for (const seg of regions || []) {
            const left = (seg.start / dur) * width;
            const right = (seg.end / dur) * width;

            ctx.save();
            ctx.globalCompositeOperation = "source-atop";
            ctx.fillStyle =
              (seg.color && seg.color.replace(/88$/, "66")) || "rgba(0,160,255,0.35)";
            ctx.fillRect(left, 0, Math.max(0, right - left), height);
            ctx.restore();
          }

          // 3) Optional played overlay on SAME canvas (very subtle)
          ctx.save();
          ctx.globalCompositeOperation = "source-atop";
          ctx.fillStyle = "rgba(255,255,255,0.08)";
          ctx.fillRect(0, 0, width * p, height);
          ctx.restore();


        },

      });

      wsRef.current = ws;


      ws.on("ready", () => {
        const wrapper = ws.getWrapper ? ws.getWrapper() : containerRef.current;

        // 1) Remove the progress overlay (it sits above the base canvas)
        const progressDiv =
          wrapper.querySelector('[part="progress"]') ||
          wrapper.querySelector(".progress");
        if (progressDiv) {
          progressDiv.style.display = "none"; // or: progressDiv.remove();
        }

        // 2) Neutralize the base canvases clip-path (that was hiding the "played" half)
        const canvasesDiv =
          wrapper.querySelector('[part="canvases"]') ||
          wrapper.querySelector(".canvases");
        if (canvasesDiv) {
          canvasesDiv.style.clipPath = "none";
          canvasesDiv.style.webkitClipPath = "none";
        }

        console.log("✅ WaveSurfer ready (no progress overlay, no clip-path)");
        onReady && onReady();
      });

    };


    if (audio.readyState >= 1) {
      setup();
    } else {
      audio.addEventListener("loadedmetadata", setup, { once: true });
    }

    // 🧹 Cleanup
    return () => {
      try { wsRef.current?.destroy(); } catch { }
      wsRef.current = null;
    };
  }, [audioRef, regions, height, follow]);


  return <div ref={containerRef} className="wave" id="waveform" />
}


/* ---------- player ---------- */

import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";


// add time, dur props
function TransportButtons({ audioRef, time, dur }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play().catch(() => { });
    } else {
      el.pause();
    }
  }, [audioRef]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onPlay = () => {
      setIsPlaying(true);
      setShowTime(true); // reveal after first play
    };
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    setIsPlaying(!el.paused);

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
    };
  }, [audioRef]);

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <button
        className="btn playBtn"
        onClick={togglePlay}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause" : "Play"}
        title={isPlaying ? "Pause" : "Play"}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "width 0.25s ease" // optional for smoother growth
        }}
      >
        {isPlaying ? (
          <FaPause style={{ verticalAlign: "middle" }} />
        ) : (
          <FaPlay style={{ verticalAlign: "middle" }} />
        )}

        {/* label */}
        <span
          style={{
            display: "inline-block",
            width: "5ch",
            textAlign: "left",
            whiteSpace: "nowrap"
          }}
        >
          {isPlaying ? "Pause" : "Play"}
        </span>

        {/* timecode — only renders after first play */}
        {showTime && (
          <span
            style={{
              fontVariantNumeric: "tabular-nums",
              opacity: 0.85,
              whiteSpace: "nowrap",
              transition: "opacity 0.3s ease"
            }}
          >
            {`${formatTime(time)} / ${formatTime(dur)}`}
          </span>
        )}
      </button>
    </div>
  );
}


function RegionLabel({ label }) {
  const l = String(label).toLowerCase();
  if (label === "↑" || l === "up") {
    return <TbArrowBigUp aria-label="Up" style={{ filter: "drop-shadow(0px 0px 3px black)" }} />;
  }
  if (label === "↓" || l === "down") {
    return <TbArrowBigDown aria-label="Down" style={{ filter: "drop-shadow(0px 0px 3px black)" }} />;
  }
  return <>{label}</>;
}


function Player({ song, onBack, onReady }) {
  const audioRef = useRef(null);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);

  const activeRegionIndex = React.useMemo(() => {
    const t = time || 0;
    const list = song?.regions || [];
    // first region where start <= t < end
    const idx = list.findIndex(r => t >= r.start && t < r.end);
    return idx; // -1 if none
  }, [time, song?.regions]);


  // NEW: overlay state
  const [waveReady, setWaveReady] = useState(false);

  // Reset overlay on song change (and optionally warm any album art)
  useEffect(() => {
    setWaveReady(false);
  }, [song?.id]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space") {
        e.preventDefault();
        if (audioRef.current?.paused) audioRef.current.play();
        else audioRef.current?.pause();
      } else if (e.key.toLowerCase() === "j") {
        audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
      } else if (e.key.toLowerCase() === "k") {
        audioRef.current.currentTime = Math.min(
          dur || audioRef.current.duration || Infinity,
          audioRef.current.currentTime + 5
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dur]);

  // 🆕 ADD THIS EFFECT BELOW
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    try {
      a.pause();
      a.muted = false;
      a.volume = 1.0;
      a.playbackRate = 1.0;
      a.currentTime = 0;
      a.load(); // force reload of new source
    } catch { }
  }, [song?.audioUrl]); // runs whenever the song changes

  return (

    <section className="player">

      <div className="player-bar">
        <div className="time-transport">

          <TransportButtons audioRef={audioRef} time={time} dur={dur} />

        </div>

        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{song.title}</h2>
        <div style={{ color: "#B8B8B9" }}>{song.artist}</div>
        <span className="pill">{song.genre}</span>
        <div className="time-genre" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>


        </div>


      </div>

      {/* Make the card a positioning context for the overlay */}
      <div className="player-card" style={{ position: "relative" }}>
        {/* Loading overlay (covers card until waveform is ready) */}

        <audio
          ref={audioRef}
          src={song.audioUrl}
          crossOrigin="anonymous"  // 🆕 add this
          preload="auto"
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDur(e.currentTarget.duration || 0)}
          controls
          style={{ width: "100%", display: "none" }}

        />

        {
          song.regions?.length > 0 && (
            <div className="region-grid">
              {song.regions.map((r, idx) => (
                <button
                  key={r.id ?? `${song.id}-r-${idx}`}
                  className={`region ${r.size || ""} ${idx === activeRegionIndex ? "active" : ""}`}
                  style={{
                    border: `1px solid ${r.color}`,
                    background: idx === activeRegionIndex ? makeSolid(r.color) : "transparent",
                    color: idx === activeRegionIndex ? "#fff" : r.color,
                    transition: "background 120ms linear, color 120ms linear",
                  }}
                  onClick={async () => {
                    const a = audioRef.current;
                    if (!a) return;
                    try {
                      a.currentTime = r.start;
                      await a.play();
                    } catch (err) {
                      console.error("Region play() failed:", err);
                    }
                  }}
                >
                  <div className="name">
                    <RegionLabel label={r.label} />
                  </div>
                </button>


              ))}
            </div>
          )
        }

        <WaveSurferWaveform
          audioRef={audioRef}
          regions={song.regions}
          follow={false}
          onReady={() => {
            if (onReady) onReady();   // ✅ triggers App.handleReady
          }}
        />





      </div>

      <div className="back-tip">
        <button className="btn backBtn" onClick={onBack}>← Back</button>
        <div className="tip">Tip: Press Space to play/pause, J/K to seek ±5s</div>
        <div className="ghost btn"></div>
      </div>


    </section >
  );
}

/* ---------- browser ---------- */
function Browser({ songs, onSelect }) {
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("All");
  const genres = useMemo(() => ["All", ...Array.from(new Set(songs.map(s => s.genre)))], [songs]);

  const filtered = useMemo(() => {
    const qLower = q.toLowerCase();
    return songs.filter(s => {
      const matchesQ = !qLower || `${s.title} ${s.artist}`.toLowerCase().includes(qLower);
      const matchesG = genre === "All" || s.genre === genre;
      return matchesQ && matchesG;
    });
  }, [q, genre, songs]);

  return (
    <>
      <div className="controls">
        {/* <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search songs or artists" /> */}
        <select className="select" value={genre} onChange={(e) => setGenre(e.target.value)}>
          {genres.map(g => <option key={g}>{g}</option>)}
        </select>
      </div>

      <section className="browser">
        <div className="grid">
          {filtered.map(s => (
            <button key={s.id} className="card" onClick={() => onSelect(s)}>
              <div className="card-inset">
                <div className="card-img-container">
                  <img src={s.albumArt} alt="" height={"100px"} width={"100px"} />
                </div>
                <div style={{ display: "grid", minWidth: 0, flex: 1, textAlign: "left" }}>
                  <h4 className="title-sm">{s.title}</h4>
                  <p>{s.artist}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

    </>
  );
}

function LoadingScreen({ song }) {
  return (
    <div className="loading-screen">
      <div className="loading-card">
        {song.albumArt && <img src={song.albumArt} alt={song.title} />}
        <div>
          <h2>{song.title}</h2>
          <p>{song.artist}</p>
          <p style={{ opacity: 0.6 }}>Building waveform…</p>
        </div>
      </div>
    </div>
  );
}


/* ---------- app ---------- */
export default function App() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (song) => {
    setLoading(true);
    setSelected(song);
  };


  const handleReady = () => {
    // Give React a short frame to mount the Player before hiding loading
    setTimeout(() => setLoading(false), 300);
  };

  return (
    <div className="app">
      <div className="page">
        <header className="header">
          <div className="logo-container">
            <img src="./images/Hero Contour Lab Logo.png" alt="" />
          </div>
        </header>

        {!selected && <Browser songs={SAMPLE_SONGS} onSelect={handleSelect} />}

        {selected && (
          <>
            <Player song={selected} onBack={() => setSelected(null)} onReady={handleReady} />
            {loading && <LoadingScreen song={selected} />}
          </>
        )}

      </div>
    </div>
  );
}
