<?php
function revopsdev_homepage_schema() {
    if ( is_front_page() ) {
        ?>
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://revopsdev.com/#organization",
        "name": "RevOpsDev",
        "url": "https://revopsdev.com",
        "logo": "https://revopsdev.com/logo.png",
        "description": "End-to-end RevOps engineering — architecture, build, optimisation, and ops across data, cloud, HubSpot, and integrations.",
        "founder": { "@id": "https://revopsdev.com/#sharoze" },
        "sameAs": [
          "https://www.linkedin.com/in/chsharoze",
          "https://github.com/chsharoze"
        ]
      },
      {
        "@type": "Person",
        "@id": "https://revopsdev.com/#sharoze",
        "name": "Sharoze Iftikhar",
        "jobTitle": "RevOps Solutions Architect and Developer",
        "worksFor": { "@id": "https://revopsdev.com/#organization" },
        "url": "https://chsharoze.com",
        "sameAs": [
          "https://www.linkedin.com/in/chsharoze",
          "https://github.com/chsharoze"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://revopsdev.com/#website",
        "url": "https://revopsdev.com",
        "name": "RevOpsDev",
        "publisher": { "@id": "https://revopsdev.com/#organization" },
        "inLanguage": "en"
      },
      {
        "@type": "Service",
        "name": "HubSpot Projects",
        "provider": { "@id": "https://revopsdev.com/#organization" },
        "description": "Custom HubSpot workflow actions, serverless functions, UI extensions, CRM cards, automation logic, and marketplace apps.",
        "serviceType": "HubSpot Development"
      },
      {
        "@type": "Service",
        "name": "Custom Integrations Architecture",
        "provider": { "@id": "https://revopsdev.com/#organization" },
        "description": "Designing and building integrations between HubSpot and platforms without native connectors. Webhook architecture, data sync pipelines, API design.",
        "serviceType": "Integration Engineering"
      },
      {
        "@type": "Service",
        "name": "Cloud Ops",
        "provider": { "@id": "https://revopsdev.com/#organization" },
        "description": "Infrastructure for RevOps data pipelines, deployment, monitoring, and scaling on Hetzner, Hostinger, Cloudflare and similar providers.",
        "serviceType": "Cloud Operations"
      },
      {
        "@type": "Service",
        "name": "Offline Data Ops",
        "provider": { "@id": "https://revopsdev.com/#organization" },
        "description": "Data hygiene at scale, deduplication, normalisation, enrichment, migrations (CRM-to-CRM, MAP-to-MAP), batch processing.",
        "serviceType": "Data Operations"
      }
    ]
  }
  </script>
        <?php
    }
}
