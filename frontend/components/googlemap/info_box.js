export const mapsInfoBox = (residency) => {
    return `
        <div class="map-info-window">

            <div class="map-info-content">
                <h3>${residency.name}</h3>
                <a href=${residency.website_url}>${residency.website_url}</a>
            </div>

        </div>
    `;
};
