import brisketImage from '../assets/brskt.svg'
import phoDipImage from '../assets/phodip.svg'
import alPastorImage from '../assets/alpstrchzstk.svg'

const items = [
  {
    name: 'Brisket',
    price: '$18',
    description:
      'brioche bun, seared brisket, pickled onions and jalapeños, tangy bbq sauce',
    image: brisketImage,
  },
  {
    name: 'Pho Dip',
    price: '$22',
    description:
      'hoagie roll, hoisin grilled beef, pickled jalapeño, cilantro, jalapeños, pickled white onion, pho mayo, pho dipping broth',
    image: phoDipImage,
  },
  {
    name: 'Al Pastor + Cheese Steak',
    price: '',
    description:
      'hoagie roll, pepper jack cheese, pineapple chutney, al pastor beef, pickled red onion',
    image: alPastorImage,
  },
]

function Order() {
  return (
    <div className="app-shell">
      <div className="page order-page">
        <div className="hero">
          <div className="ghost-404" aria-hidden="true">
            404
          </div>
        </div>

        <div className="band">
          <div>
            <h1 className="headline-glitch">Ordering Page</h1>
            <p>This is where the ordering UI will go.</p>
          </div>
        </div>

        <div className="menu-list">
          {items.map((item) => (
            <article className="menu-card" key={item.name}>
              <div className="menu-image-wrap">
                <img src={item.image} alt={item.name} loading="lazy" />
              </div>
              <div className="menu-content">
                <div className="menu-header">
                  <h2>{item.name}</h2>
                  {item.price && <span className="price">{item.price}</span>}
                </div>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Order
