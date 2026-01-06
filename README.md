# Paper

My personal news/feed reader that fetches and displays posts from my remote source.

## Installation

To use this on your website, add these lines to your HTML:

```html
<link rel="stylesheet" href="https://wxn0brp.github.io/paper/style.css">
<script src="https://wxn0brp.github.io/paper/dist/load.js"></script>
```

## Internal Settings

You can set the following settings by adding them to the URL as query parameters:

- `bg-body`: Background color of the body
- `bg-card`: Background color of the cards
- `txt-primary`: Primary text color
- `txt-secondary`: Secondary text color
- `accent`: Accent color
- `accent-hover`: Accent color on hover
- `border`: Border color
- `radius`: Border radius
- `font-main`: Main font

## Example Settings

```html
<script src="https://wxn0brp.github.io/paper/dist/load.js?bg-body=black&txt-primary=white&accent=blue&accent-hover=green"></script>
```

## Popup Settings

:root {
    --small-paper-iframe-right: 10px;
    --small-paper-iframe-bottom: 60px;
    --small-paper-iframe-width: 300px;
    --small-paper-iframe-height: 600px;
    --small-paper-iframe-radius: 8px;
    --small-paper-iframe-z: 999;
    --small-paper-button-right: 10px;
    --small-paper-button-bottom: 10px;
    --small-paper-button-size: 2rem;
    --small-paper-button-size: 2rem;
    --small-paper-button-radius: 50%;
    --small-paper-button-bg: #2c2c2c;
    --small-paper-button-txt: #ededed;
    --small-paper-button-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    --small-paper-button-z: 1000;
}

## Features

- Fetches posts from my remote URL
- Stores posts in localStorage for offline access
- Tracks viewed posts
- Displays posts with title, date, content, and optional source link/icon

## How it works

The application consists of two main parts:

1. **index.ts** - The main application that fetches posts, manages state, and renders news items
2. **load.ts** - A loader script that creates an iframe and button to interact with the news feed

Posts are expected to be in a specific format (title, date, URL, icon, content) and stored as text files on my server.