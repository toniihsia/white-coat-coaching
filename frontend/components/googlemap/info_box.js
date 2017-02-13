export const mapsInfoBox = (residency) => {
  return `
  <div id="info-window-large">
    <div class="res-header">
      <img class='res-info-photo' src="${residency.image_url}" alt="${residency.name}${residency.id}"}></img>

      <div class="right-content">
        <div class="info-res-title">${residency.name}</div>

        <div class="res-section-header">
          <h3 class="res-header-1">Website</h3>
          <a class="info-res-url" href="${residency.website_url}">${residency.website_url}</a>
        </div>

        <div class="res-section-header">
          <h3 class="res-header-1">Address</h3>
          <div class="res-inner-content">${residency.address.street}</div>
          <div class="res-inner-content">${residency.address.city}, ${residency.address.state} ${residency.address.zip_code}</div>
        </div>
      </div>
    </div>

    <div class="res-details">
      <h3 id="detail-title">Description</h3>
      <div class="res-details">
        <div class="desc">${residency.description}</div>
      </div>
    </div>

    <div class="contact">
      <div class="res-details">
        <h3 id="detail-title">Contact</h3>

        <div class="res-details">
          <div class="left">
            <div class="res-section">
              <div class="left-label">PD:</div>
              <div class="right-content">${residency.PD}</div>
            </div>
            <div class="res-section">
              <h3 class="res-header-1">Coordinator Info</h3>
              <div class="flex-container">
                <div class="left-label">Name:</div>
                <div class="right-content">${residency.coordinator.name}</div>
              </div>
              <div class="flex-container">
                <div class="left-label">Email:</div>
                <div class="right-content"> ${residency.coordinator.email}</div>
              </div>
              <div class="flex-container">
                <div class="left-label">Phone #: </div>
                <div class="right-content"> ${residency.coordinator.phone_number}</div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="res-section">
              <h3 class="res-header-1">Med Student Coordinator Info</h3>
              <div class="flex-container">
                <div class="left-label">Name:</div>
                <div class="right-content"> ${residency.med_student_coordinator.name}</div>
              </div>
              <div class="flex-container">
                <div class="left-label">Email:</div>
                <div class="right-content"> ${residency.med_student_coordinator.email}</div>
              </div>
              <div class="flex-container">
                <div class="left-label">Phone #: </div>
                <div class="right-content"> ${residency.med_student_coordinator.phone_number}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="details">
      <div class="res-details">
        <h3 id="detail-title">Details</h3>
        <div class="res-details">
          <div class="left">
            <div class="res-section">
              <h3 class="res-header-1">Merger Status</h3>
              <div class="res-inner-content">${residency.merger_status}</div>
            </div>
            <div class="res-section">
              <h3 class="res-header-1">Curriculum</h3>
              <div class="res-inner-content"> ${residency.curriculum}</div>
            </div>
            <div class="res-section">
              <h3 class="res-header-1">Residency Info</h3>
              <div class="flex-container">
                <div class="left-label">Max # of Students: </div>
                <div class="right-content"> ${residency.max_students}</div>
              </div>
              <div class="flex-container">
                <div class="left-label"># of Students: </div>
                <div class="right-content"> ${residency.num_students}</div>
              </div>
            </div>
            <div class="res-section">
              <h3 class="res-header-1">Crowded Period</h3>
              <div class="flex-container">
                <div class="left-label">Start Date: </div>
                <div class="right-content"> ${residency.crowded_period.start_date}</div>
              </div>
              <div class="flex-container">
                <div class="left-label">End Date: </div>
                <div class="right-content"> ${residency.crowded_period.end_date}</div>
              </div>
            </div>
          </div>

          <div class="right">
            <div class="res-section">
              <h3 class="res-header-1">Rotation</h3>
              <div class="flex-container">
                <div class="left-label">Booking Date: </div>
                <div class="right-content"> ${residency.rotation.booking_date}</div>
              </div>
              <div class="left-label">Booking Medium: </div>
              <div class="booking-medium">${residency.rotation.booking_medium}</div>
              <div class="flex-container">
                <div class="left-label">Schedule Restrictions: </div>
                <div class="right-content"> ${residency.rotation.schedule_restrictions}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
};
