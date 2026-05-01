# KOTOV — Premium Barber Studio

Сайт-визитка барбера **@kotov.haircuts** — премиум одностраничник с галереей работ,
видео, прайсом, отзывами, формой записи и контактами.

## Запуск

Это статический сайт — никаких сборок не нужно.

```bash
# Любой статический сервер, например:
python3 -m http.server 8080
# затем открой http://localhost:8080
```

Или просто открой `index.html` в браузере.

## Подключение реальных фото и видео

В разделе галереи и видео сейчас стоят высококачественные плейсхолдеры (Unsplash).
Чтобы поставить реальные работы из Instagram **@kotov.haircuts**:

### Фотографии

1. Сохрани фото из Instagram в `assets/images/` (например, `work-01.jpg`).
2. Открой `assets/js/main.js` и в массиве `galleryItems` замени `src`:
   ```js
   { src: "assets/images/work-01.jpg", label: "Skin Fade", cls: "gallery__tile--tall" },
   ```
3. Поддерживаются классы:
   - `gallery__tile--wide` — широкая плитка (2 колонки)
   - `gallery__tile--tall` — высокая плитка (2 ряда)

### Видео (Reels)

1. Положи `.mp4` файл в `assets/videos/` (например, `reel-01.mp4`).
2. Сохрани превью-кадр (poster) в `assets/images/` (например, `reel-01-poster.jpg`).
3. В `assets/js/main.js` обнови `videoItems`:
   ```js
   {
     poster: "assets/images/reel-01-poster.jpg",
     src: "assets/videos/reel-01.mp4",
     title: "Skin fade, шаг за шагом",
     meta: "Reels · 0:42"
   }
   ```

## Что заменить под реальные данные

В `index.html`:

- Телефон: `tel:+70000000000` (две точки: атрибут и текст в `.contact__list`)
- Адрес: блок «Адрес студии»
- Часы работы: блок «Часы работы»
- Email: `mailto:hello@kotovhaircuts.ru`
- Telegram: `https://t.me/kotov_haircuts`
- WhatsApp: `https://wa.me/70000000000`
- Цены и услуги: блок `.services__grid`
- Отзывы: блок `.reviews__grid`

## Стек

- Чистый HTML + CSS + ванильный JS — без фреймворков и сборки.
- Шрифты: Playfair Display, Inter, Bebas Neue (Google Fonts).
- Полностью адаптивно (desktop, tablet, mobile).
- Лайтбокс для фото/видео с навигацией клавишами.

## Деплой

Подойдёт любой хостинг статики:
- **GitHub Pages** — Settings → Pages → выбрать ветку.
- **Netlify** / **Vercel** — drag-and-drop папки.
- **Cloudflare Pages** — connect repo → build command пусто, output `.`.
