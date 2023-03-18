import "../styles/search.scss";
import { format } from "date-fns";

import { useLocation } from 'react-router-dom';
import Header from "../components/Header";

export default function Search() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const locationParam = queryParams.get('location');
    const startDateParam = queryParams.get('startDate');
    const endDateParam = queryParams.get('endDate');
    const numOfGuestsParam = queryParams.get('numOfGuests');

    const fomattedStartDate = format(new Date(startDateParam), "dd MMMM yy");
    const fomattedEndDate = format(new Date(endDateParam), "dd MMMM yy");
    const range = `${fomattedStartDate} - ${fomattedEndDate}`;

    return (
        <div className="Search">
            <Header
                searchInput={locationParam}
                startDate={new Date(startDateParam)}
                endDate={new Date(endDateParam)}
                numOfGuests={numOfGuestsParam}

                placeholder={`${locationParam}`}
            />
            <main>
                <section>
                    <p>8 Stays - {range} for {numOfGuestsParam} guests</p>
                    <h1>Stays in {locationParam}</h1>

                    <div>
                        <p>Cancellation Flexibility</p>
                        <p>Type of Place</p>
                        <p>Price</p>
                        <p>Rooms and Beds</p>
                        <p>More filters</p>
                    </div>
                </section>
            </main>
        </div>
    )
}