const priceData = [
    { thickness: 1.0, steel: 43, stainless: 140, aluminum: 304, zinc: 140, brass: 314, copper: 314, titanium: 403 },
    { thickness: 1.5, steel: 55, stainless: 155, aluminum: 304, zinc: 155, brass: 495, copper: 495, titanium: 535 },
    { thickness: 2.0, steel: 64, stainless: 165, aluminum: 304, zinc: 165, brass: 585, copper: 585, titanium: 645 },
    { thickness: 2.5, steel: 84, stainless: 184, aluminum: 314, zinc: 184, brass: 904, copper: 904, titanium: 904 },
    { thickness: 3.0, steel: 102, stainless: 205, aluminum: 324, zinc: 205, brass: 1045, copper: 1045, titanium: 1045 },
    { thickness: 4.0, steel: 141, stainless: 220, aluminum: 344, zinc: 220, brass: 1430, copper: 1430, titanium: 1430 },
    { thickness: 5.0, steel: 184, stainless: 260, aluminum: 434, zinc: 260, brass: 1645, copper: 1645, titanium: 1645 },
    { thickness: 6.0, steel: 220, stainless: 300, aluminum: 494, zinc: 300, brass: 1845, copper: 1845, titanium: 1845 },
    { thickness: 8.0, steel: 270, stainless: 350, aluminum: 534, zinc: 350, brass: 2145, copper: 2145, titanium: 2145 },
    { thickness: 10.0, steel: 325, stainless: 430, aluminum: 604, zinc: 430, brass: 2470, copper: 2470, titanium: 2470 },
    { thickness: 12.0, steel: 421, stainless: 560, aluminum: 704, zinc: 560, brass: 2970, copper: 2970, titanium: 2970 },
    { thickness: 14.0, steel: 520, stainless: 720, aluminum: 804, zinc: 720, brass: 3820, copper: 3820, titanium: 3820 },
    { thickness: 16.0, steel: 608, stainless: 890, aluminum: 904, zinc: 890, brass: 4620, copper: 4620, titanium: 4620 },
    { thickness: 18.0, steel: 710, stainless: 1102, aluminum: 1004, zinc: 1102, brass: 5220, copper: 5220, titanium: 5220 },
    { thickness: 20.0, steel: 813, stainless: 1315, aluminum: 1210, zinc: 1315, brass: 5980, copper: 5980, titanium: 5980 }
];

const materials = [
    { id: 'steel', name: 'Черная сталь', key: 'steel', stock: 'В наличии: листы 1500x3000, 1250x2500' },
    { id: 'stainless', name: 'Нержавеющая (матовая) сталь', key: 'stainless', stock: 'Только из материала заказчика' },
    { id: 'aluminum', name: 'Алюминий', key: 'aluminum', stock: 'В наличии' },
    { id: 'zinc', name: 'Оцинкованная сталь', key: 'zinc', stock: 'Нет в наличии — режем из вашего металла' },
    { id: 'brass', name: 'Латунь', key: 'brass', stock: 'Нет в наличии — из материала заказчика' },
    { id: 'copper', name: 'Медь', key: 'copper', stock: 'Нет в наличии — из материала заказчика' },
    { id: 'titanium', name: 'Титан', key: 'titanium', stock: 'Нет в наличии — из материала заказчика' }
];

// DOM элементы
const materialSelect = document.getElementById('material');
const thicknessSlider = document.getElementById('thickness');
const thicknessValue = document.getElementById('thicknessValue');
const lengthInput = document.getElementById('length');
const pricePerMeterDisplay = document.getElementById('pricePerMeterDisplay');
const totalDisplay = document.getElementById('totalDisplay');
const materialNote = document.getElementById('materialNote');

// Заполняем select материалами
materials.forEach(mat => {
    const option = document.createElement('option');
    option.value = mat.id;
    option.textContent = mat.name;
    materialSelect.appendChild(option);
});

// Функция поиска цен по толщине
function getPriceRow(thickness) {
    return priceData.find(row => Math.abs(row.thickness - thickness) < 0.1) || null;
}

// Обновление интерфейса
function update() {
    const selectedMaterialId = materialSelect.value;
    const material = materials.find(m => m.id === selectedMaterialId);
    if (!material) return;

    const thickness = parseFloat(thicknessSlider.value);
    thicknessValue.textContent = thickness.toFixed(1) + ' мм';

    const length = parseFloat(lengthInput.value) || 0;

    const priceRow = getPriceRow(thickness);
    let pricePerMeter = 0;
    let total = 0;

    if (priceRow && material) {
        pricePerMeter = priceRow[material.key] || 0;
        total = pricePerMeter * length;
    }

    // Отображение цены за метр
    pricePerMeterDisplay.innerHTML = `Цена за 1 м: <strong>${pricePerMeter.toFixed(2)} ₽</strong>`;

    // Итог
    totalDisplay.innerHTML = `Итого: <strong>${total.toFixed(2)} ₽</strong>`;

    // Примечание по наличию
    if (material) {
        let noteText = material.stock;
        if (material.id === 'steel') {
            noteText += ' — Ст3 (3–20 мм), 08ПС (1–2.5 мм)';
        }
        if (material.id === 'stainless') {
            noteText += ' — зеркальную и шлифованную только из металла заказчика';
        }
        materialNote.textContent = noteText;
    }
}

// События
materialSelect.addEventListener('change', update);
thicknessSlider.addEventListener('input', update);
lengthInput.addEventListener('input', update);

// Первый запуск
update();
