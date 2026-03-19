#!/bin/bash


FILES=(
  src/pages/About.jsx
  src/pages/Blog.jsx
  src/pages/BlogPost.jsx
  src/pages/Contact.jsx
  src/pages/Skills.jsx
)

for FILE in "${FILES[@]}"; do
  echo "Patching $FILE..."

  # ── Page root backgrounds 
  sed -i 's/className="min-h-screen bg-\[#06090f\]/className="min-h-screen bg-white dark:bg-[#06090f]/g' "$FILE"
  sed -i 's/className="min-h-screen bg-\[#070b12\]/className="min-h-screen bg-white dark:bg-[#070b12]/g' "$FILE"
  sed -i 's/className="min-h-screen bg-\[#080c14\]/className="min-h-screen bg-white dark:bg-[#080c14]/g' "$FILE"

  # loading / 404 screens
  sed -i 's/className="min-h-screen bg-\[#06090f\] flex items-center justify-center"/className="min-h-screen bg-white dark:bg-[#06090f] flex items-center justify-center"/g' "$FILE"
  sed -i 's/className="min-h-screen bg-\[#06090f\] flex flex-col items-center justify-center text-slate-400/className="min-h-screen bg-white dark:bg-[#06090f] flex flex-col items-center justify-center text-slate-400/g' "$FILE"

  # ── Card / panel backgrounds 
  sed -i 's/ bg-slate-900\/80/ bg-white\/80 dark:bg-slate-900\/80/g' "$FILE"
  sed -i 's/ bg-slate-900\/60/ bg-slate-100\/60 dark:bg-slate-900\/60/g' "$FILE"
  sed -i 's/ bg-slate-900\/50/ bg-slate-100\/50 dark:bg-slate-900\/50/g' "$FILE"
  sed -i 's/ bg-slate-900\/40/ bg-slate-100\/40 dark:bg-slate-900\/40/g' "$FILE"
  sed -i 's/ bg-slate-900\/30/ bg-slate-100\/30 dark:bg-slate-900\/30/g' "$FILE"
  sed -i 's/ bg-slate-900 / bg-white dark:bg-slate-900 /g' "$FILE"
  sed -i 's/ bg-slate-950 / bg-slate-50 dark:bg-slate-950 /g' "$FILE"

  # ── Borders 
  sed -i 's/ border-slate-800/ border-slate-200 dark:border-slate-800/g' "$FILE"
  sed -i 's/ border-slate-700/ border-slate-300 dark:border-slate-700/g' "$FILE"

  # ── Text colors 
  sed -i 's/ text-slate-200/ text-slate-800 dark:text-slate-200/g' "$FILE"
  sed -i 's/ text-slate-300/ text-slate-700 dark:text-slate-300/g' "$FILE"
  sed -i 's/ text-slate-400/ text-slate-500 dark:text-slate-400/g' "$FILE"

  # ── Input fields 
  sed -i 's/placeholder-slate-600/placeholder-slate-400 dark:placeholder-slate-600/g' "$FILE"

  echo "  ✓ Done"
done

echo ""
echo "All pages patched. Restart your dev server: npm run dev"