import "../styles/mediumcard.scss";

export default function MediumCard ({ id, img, title }) {
    return (
        <div className="medium-card">
            <div className="">
                <img src={img} alt="" layout="fill" />
            </div>
            <h3 className="text-2xl mt-3">{title}</h3>
        </div>
    )
}