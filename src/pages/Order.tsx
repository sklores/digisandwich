import RecipeRain from "../components/RecipeRain";

import brsktImg from "../assets/brskt.svg";
import phodipImg from "../assets/phodip.svg";
import alpImg from "../assets/alpstrchzstk.svg";

export default function Order() {
  return (
    <div className="app-shell order-page">
      <div className="page">
        {/* moving border (left/right) */}
        <div className="rain-border left" aria-hidden="true">
          <RecipeRain variant="border" columns={3} />
        </div>
        <div className="rain-border right" aria-hidden="true">
          <RecipeRain variant="border" columns={3} />
        </div>

        <div className="menu-list">
          <div className="menu-card">
            <div className="menu-image-wrap">
              <img src={brsktImg} alt="Brisket" />
            </div>
            <div className="menu-content">
              <div className="menu-header">
                <h2>Brisket</h2>
                <div className="price">$18</div>
              </div>
              <p>
                brioche bun, seared brisket, pickled onions and jalapeños, tangy
                bbq sauce
              </p>
            </div>
          </div>

          <div className="menu-card">
            <div className="menu-image-wrap">
              <img src={phodipImg} alt="Pho Dip" />
            </div>
            <div className="menu-content">
              <div className="menu-header">
                <h2>Pho Dip</h2>
                <div className="price">$22</div>
              </div>
              <p>
                hoagie roll, hoisin grilled beef, pickled jalapeño, cilantro,
                jalapeños, pickled white onion, pho mayo, pho dipping broth
              </p>
            </div>
          </div>

          <div className="menu-card">
            <div className="menu-image-wrap">
              <img src={alpImg} alt="Al Pastor + Cheese Steak" />
            </div>
            <div className="menu-content">
              <div className="menu-header">
                <h2>Al Pastor + Cheese Steak</h2>
              </div>
              <p>
                hoagie roll, pepper jack cheese, pineapple chutney, al pastor
                beef, pickled red onion
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}