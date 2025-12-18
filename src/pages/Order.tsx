import RecipeRain from "../components/RecipeRain";

export default function Order() {
  // Renders exactly: s&\/\/!cH
  const TITLE = "s&\\/\\/!cH";

  const items = [
    {
      name: "Brisket",
      alias: "lowandslow.exe",
      price: "$18",
      desc: "Brioche bun. Slow-seared brisket. Sharp pickled onion, jalapeño. Finished with house BBQ—smoky, tangy, built on salt and fat. Low heat, long execution.",
      img: "/images/menupics/brisket.jpg",
    },
    {
      name: "Pho Dip",
      alias: "phodip.sys",
      price: "$22",
      desc: "Hoisin-grilled beef on a hoagie roll with pickled jalapeño, cilantro, and white onion. Pho mayo on the sandwich, aromatic pho broth on the side. Dip enabled.",
      img: "/images/menupics/phodip.jpg",
    },
    {
      name: "Al Pastor Cheesesteak",
      alias: "spitfire.log",
      price: "$20",
      desc: "Charred al pastor beef layered with pepper jack, pineapple chutney, and pickled red onion on a hoagie roll. Sweet, spicy, melty, and direct.",
      img: "/images/menupics/alpastorcheesesteak.jpg",
    },
    {
      name: "Michelada Mixto",
      alias: "michelada_mix.iso",
      price: "$19",
      desc: "Grilled chorizo and chicken breast on a hoagie roll with tomato, cilantro, pickled jalapeño, and pepper jack. Finished with michelada queso—a warm beer-forward cheese sauce built with lime, ancho, paprika, and heat. Savory, spicy, cohesive.",
      // NOTE: your file has a space + caps, so we URL-encode it.
      img: "/images/menupics/Michelada%20Mixto.jpg",
    },
    {
      name: "Berbere Gyro",
      alias: "redembers.cfg",
      price: "$21",
      desc: "Flame-roasted awaze-spiced beef and lamb wrapped in injera pita with bright salata and creamy ayib (feta-style). Deep spice, acidity, and warmth in balance.",
      img: "/images/menupics/berberegyro.jpg",
    },
    {
      name: "Ultimate Rye (Rye or Die)",
      alias: "ryeordie.png",
      price: "$24",
      desc: "Triple-decker marble and Jewish rye stacked with pastrami, turkey pastrami, and corned beef. Brooklyn kraut, pickled mustard seed, hot deli mustard. Kosher dill on the side. No shortcuts taken.",
      img: "/images/menupics/ultimaterye.jpg",
    },
    {
      name: "Chinese Pork",
      alias: "chpk.html",
      price: "$19",
      desc: "Hoisin BBQ pork with miso-tofu “cheese,” garlic-soy broccoli, and Sichuan pepper flakes on a hoagie roll. Savory, numbing, and persistent.",
      img: "/images/menupics/chinesepork.jpg",
    },
  ];

  return (
    <div className="app-shell order-page">
      <div className="page order-shell">
        {/* Full background recipe rain */}
        <RecipeRain variant="full" columns={10} className="order-rain-bg" />

        {/* Title */}
        <div className="order-title-wrap" aria-hidden="true">
          <div className="order-title glitch-title" data-text={TITLE}>
            {TITLE}
          </div>
        </div>

        {/* Menu */}
        <div className="menu-list">
          {items.map((it) => (
            <div className="menu-card" key={it.alias}>
              <div className="menu-image-wrap">
                <img src={it.img} alt={it.name} />
              </div>

              <div className="menu-content">
                <div className="menu-header">
                  <h2>
                    {it.name} <span style={{ fontWeight: 500, opacity: 0.55 }}>({it.alias})</span>
                  </h2>
                  <div className="price">{it.price}</div>
                </div>
                <p>{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}