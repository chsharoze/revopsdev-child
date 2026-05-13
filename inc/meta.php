<?php
function revopsdev_homepage_meta() {
    if ( is_front_page() ) {
        ?>
<meta name="description" content="End-to-end RevOps engineering. The architect who ships the code — across HubSpot, integrations, cloud, and data ops.">
  <meta name="author" content="Sharoze Iftikhar">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#0A0E1A">

  <link rel="canonical" href="https://revopsdev.com/">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" href="/favicon.png">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="RevOpsDev">
  <meta property="og:title" content="RevOpsDev — The architect who ships the code.">
  <meta property="og:description" content="End-to-end RevOps engineering. Architecture, build, optimisation, and ops across data, cloud, HubSpot, and integrations.">
  <meta property="og:url" content="https://revopsdev.com/">
  <meta property="og:image" content="https://revopsdev.com/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="en_US">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="RevOpsDev — The architect who ships the code.">
  <meta name="twitter:description" content="End-to-end RevOps engineering. Architecture, build, optimisation, and ops across data, cloud, HubSpot, and integrations.">
  <meta name="twitter:image" content="https://revopsdev.com/og-image.png">
        <?php
    }
}
