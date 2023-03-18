import "../styles/smallcard.scss";

export default function SmallCard({ id, img, location, distance }) {
    return (
        <div className="small-card">
            {/* Left */}
            <div>
                <img src={img} alt={location} />
            </div>

            {/* Right */}
            <div>
                <h2>{location}</h2>
                <h3>{distance}</h3>
            </div>
        </div>
    )
}
