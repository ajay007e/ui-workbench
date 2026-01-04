import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { FiSettings, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

/* =====================
   Types
===================== */

type DateStyle = "classic" | "inline" | "stacked" | "signature" | "editorial";

type Settings = {
    font: "serif" | "sans" | "mono";
    fontSize: number;
    color: "black" | "blue";
    dateStyle: DateStyle;
};

type PersistedState = {
    pages: string[];
    currentPage: number;
    settings: Settings;
};

const STORAGE_KEY = "v0_diary-page";

/* =====================
   Option maps
===================== */

const FONT_OPTIONS = [
    { value: "serif", label: "Serif (Diary)" },
    { value: "sans", label: "Sans" },
    { value: "mono", label: "Monospace" },
] as const;

const COLOR_OPTIONS = [
    { value: "black", label: "Black" },
    { value: "blue", label: "Blue" },
] as const;

const DATE_STYLE_OPTIONS = [
    { value: "classic", label: "Classic diary" },
    { value: "inline", label: "Minimal inline" },
    { value: "stacked", label: "Stacked" },
    { value: "signature", label: "Signature" },
    { value: "editorial", label: "Editorial" },
] as const;

const fontMap = {
    serif: "font-serif",
    sans: "font-sans",
    mono: "font-mono",
};

const colorMap = {
    black: "text-neutral-900",
    blue: "text-blue-800",
};

/* =====================
   Date header
===================== */

const now = new Date();
const day = now.toLocaleDateString(undefined, { weekday: "long" });
const month = now.toLocaleDateString(undefined, { month: "long" });
const monthShort = now.toLocaleDateString(undefined, { month: "short" });
const dayNum = now.getDate();
const year = now.getFullYear();

function DateHeader({ style }: { style: DateStyle }) {
    switch (style) {
        case "classic":
            return (
                <div className="leading-tight">
                    <div className="text-sm font-medium">{day}</div>
                    <div className="text-xs tracking-widest text-neutral-500">
                        {month} {dayNum}, {year}
                    </div>
                </div>
            );
        case "inline":
            return (
                <div className="text-xs tracking-widest text-neutral-500 uppercase">
                    {monthShort} {dayNum}, {year}
                </div>
            );
        case "stacked":
            return (
                <div className="leading-none">
                    <div className="text-2xl font-semibold">{dayNum}</div>
                    <div className="text-xs uppercase tracking-widest">{month}</div>
                    <div className="text-[10px] tracking-widest text-neutral-500">
                        {year}
                    </div>
                </div>
            );
        case "signature":
            return (
                <div className="text-xs italic text-neutral-600">
                    — {month} {dayNum}, {year}
                </div>
            );
        case "editorial":
            return (
                <div className="text-xs tracking-[0.2em] text-neutral-500">
                    {month.toUpperCase()} {dayNum} · {year}
                </div>
            );
    }
}

/* =====================
   Component
===================== */

export default function DiaryPage() {
    const editorRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const lastLoadedPageRef = useRef<number | null>(null); // ✅ FIX

    const [pages, setPages] = useState<string[]>([""]);
    const [currentPage, setCurrentPage] = useState(0);
    const [showSettings, setShowSettings] = useState(false);

    const [settings, setSettings] = useState<Settings>({
        font: "serif",
        fontSize: 18,
        color: "black",
        dateStyle: "classic",
    });

    /* =====================
         Restore / Persist
      ===================== */

    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        try {
            const parsed: PersistedState = JSON.parse(raw);
            setPages(parsed.pages?.length ? parsed.pages : [""]);
            setCurrentPage(parsed.currentPage ?? 0);
            setSettings(parsed.settings);
        } catch { }
    }, []);

    useEffect(() => {
        const payload: PersistedState = { pages, currentPage, settings };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }, [pages, currentPage, settings]);

    /* =====================
         Layout
      ===================== */

    const PAGE_WIDTH = 700;
    const PAGE_HEIGHT = Math.min(900, window.innerHeight - 140);
    const HEADER_HEIGHT = 64;
    const FIXED_LINE_HEIGHT = 2.2;
    const PAGE_PADDING_X = 48;

    const WRITING_HEIGHT = PAGE_HEIGHT - HEADER_HEIGHT;

    /* =====================
         LOAD PAGE CONTENT (FIXED)
      ===================== */

    useLayoutEffect(() => {
        if (!editorRef.current) return;

        if (lastLoadedPageRef.current !== currentPage) {
            editorRef.current.innerHTML = pages[currentPage] || "";
            lastLoadedPageRef.current = currentPage;
        }
    }, [currentPage]); // ✅ IMPORTANT

    const handleInput = () => {
        if (!editorRef.current) return;
        const html = editorRef.current.innerHTML;

        setPages((p) => {
            const copy = [...p];
            copy[currentPage] = html;
            return copy;
        });
    };

    /* =====================
         Overflow detection
      ===================== */

    useLayoutEffect(() => {
        if (!editorRef.current || !measureRef.current) return;

        measureRef.current.innerHTML = editorRef.current.innerHTML;
        if (measureRef.current.scrollHeight > WRITING_HEIGHT) {
            setPages((p) => [...p, ""]);
            setCurrentPage((p) => p + 1);
        }
    }, [pages, settings]);

    const ruledStyle: React.CSSProperties = {
        fontSize: settings.fontSize,
        lineHeight: `${FIXED_LINE_HEIGHT}rem`,
        height: WRITING_HEIGHT,
        overflow: "hidden",
        backgroundSize: `100% ${FIXED_LINE_HEIGHT}rem`,
        backgroundImage:
            "linear-gradient(to bottom, transparent 94%, rgba(0,0,0,0.12) 95%)",
    };

    /* =====================
         Render
      ===================== */

    return (
        <div className="h-screen flex flex-col bg-neutral-100">
            <main className="flex-1 flex justify-center items-start pt-12">
                <div
                    className="bg-[#faf7f2] border shadow-xl flex flex-col"
                    style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }}
                >
                    <div
                        className="px-12 flex items-center justify-between"
                        style={{ height: HEADER_HEIGHT }}
                    >
                        <DateHeader style={settings.dateStyle} />
                        <button
                            className="cursor-pointer"
                            onClick={() => setShowSettings(true)}
                        >
                            <FiSettings />
                        </button>
                    </div>

                    <div
                        ref={editorRef}
                        contentEditable
                        suppressContentEditableWarning
                        onInput={handleInput}
                        className={`px-12 outline-none whitespace-pre-wrap ${fontMap[settings.font]} ${colorMap[settings.color]}`}
                        style={ruledStyle}
                    />
                </div>
            </main>

            <footer className="h-[52px] flex items-center justify-center gap-6">
                <button
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="disabled:opacity-30 text-xl cursor-pointer disabled:cursor-none"
                >
                    <FiChevronLeft />
                </button>
                <span className="text-sm text-neutral-600">
                    {currentPage + 1} / {pages.length}
                </span>
                <button
                    disabled={currentPage >= pages.length - 1}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="disabled:opacity-30 text-xl cursor-pointer disabled:cursor-none"
                >
                    <FiChevronRight />
                </button>
            </footer>

            {/* SETTINGS MODAL — UNCHANGED */}
            {showSettings && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-[#faf7f2] w-[360px] rounded-2xl shadow-2xl border border-neutral-300 p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm tracking-widest uppercase text-neutral-600">
                                Writing Settings
                            </h3>
                            <button
                                className="cursor-pointer"
                                onClick={() => setShowSettings(false)}
                            >
                                <FiX />
                            </button>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-wide text-neutral-500">
                                Font
                            </label>
                            <select
                                value={settings.font}
                                onChange={(e) =>
                                    setSettings((s) => ({
                                        ...s,
                                        font: e.target.value as Settings["font"],
                                    }))
                                }
                                className="w-full bg-transparent cursor-pointer border-b border-neutral-400 text-neutral-900 focus:outline-none py-1 text-sm"
                            >
                                {FONT_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wide text-neutral-500">
                                Font Size
                            </label>
                            <input
                                type="range"
                                min={14}
                                max={26}
                                value={settings.fontSize}
                                onChange={(e) =>
                                    setSettings((s) => ({
                                        ...s,
                                        fontSize: Number(e.target.value),
                                    }))
                                }
                                className="w-full accent-neutral-700 cursor-pointer"
                            />
                            <div className="text-xs text-neutral-500">
                                {settings.fontSize}px
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wide text-neutral-500">
                                Ink Color
                            </label>
                            <div className="flex gap-4">
                                {COLOR_OPTIONS.map((o) => (
                                    <button
                                        key={o.value}
                                        onClick={() =>
                                            setSettings((s) => ({ ...s, color: o.value }))
                                        }
                                        className={`cursor-pointer flex-1 rounded-full py-2 text-sm border transition ${settings.color === o.value
                                                ? o.value === "blue"
                                                    ? "border-blue-800 text-blue-800"
                                                    : "border-neutral-900 text-neutral-900"
                                                : "border-neutral-300 text-neutral-500"
                                            }`}
                                    >
                                        {o.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-wide text-neutral-500">
                                Date Style
                            </label>
                            <select
                                value={settings.dateStyle}
                                onChange={(e) =>
                                    setSettings((s) => ({
                                        ...s,
                                        dateStyle: e.target.value as DateStyle,
                                    }))
                                }
                                className="w-full bg-transparent cursor-pointer border-b border-neutral-400 text-neutral-900 focus:outline-none py-1 text-sm"
                            >
                                {DATE_STYLE_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            <div
                ref={measureRef}
                className="absolute -left-[9999px] top-0"
                style={{
                    width: PAGE_WIDTH - PAGE_PADDING_X * 2,
                    fontSize: settings.fontSize,
                    lineHeight: `${FIXED_LINE_HEIGHT}rem`,
                }}
            />
        </div>
    );
}
