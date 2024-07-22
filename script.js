const apiKey = 'dbc71c13436957cd29eaee0b312fefdb';  
        
const locations = {
    'Jakarta': { lat: -6.2088, lon: 106.8456 },
    'Surabaya': { lat: -7.2575, lon: 112.7521 },
    'Bandung': { lat: -6.9175, lon: 107.6191 },
    'Yogyakarta': { lat: -7.7956, lon: 110.3695 },
    'Makassar': { lat: -5.1477, lon: 119.4327 },
    'Malang': { lat: -7.9666, lon: 112.6326 },
    'Bali': { lat: -8.3405, lon: 115.0920 },
    'Mamuju': { lat: -2.6745, lon: 118.8887 },
    'Polewali Mandar': { lat: -3.5403, lon: 119.3534 },
    'Lombok': { lat: -8.6529, lon: 116.3249 }
};

function getWeather() {
    const location = document.getElementById('locationSelect').value;
    if (!location) {
        alert('Silakan pilih lokasi terlebih dahulu.');
        return;
    }
    const { lat, lon } = locations[location];
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=id&appid=${apiKey}`;
    const monthlyApiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=30&units=metric&lang=id&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherResult = document.getElementById('weatherResult');
            weatherResult.style.display = 'block';
            weatherResult.innerHTML = `
                <section class="vh-100">
                    <div class="container py-5 h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col-md-12 col-xl-10">
                                <div class="card shadow-0 border border-dark border-5 text-dark">
                                    <div class="card-body p-4">
                                        <div class="row text-center">
                                            <div class="col-md-9 text-center border-end border-5 border-dark py-4">
                                                <div class="d-flex justify-content-around mt-3">
                                                    <p class="small">${location}</p>
                                                    <p class="small">${new Date(data.dt * 1000).toLocaleDateString()}</p>
                                                    <p class="small">${data.weather[0].description}</p>
                                                </div>
                                                <div class="d-flex justify-content-around align-items-center py-5 my-4">
                                                    <p class="fw-bold mb-0" style="font-size: 7rem;">${data.main.temp}°C</p>
                                                    <div class="text-start">
                                                        <p class="small">${new Date(data.dt * 1000).toLocaleTimeString()}</p>
                                                        <p class="h3 mb-3">${new Date(data.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long' })}</p>
                                                        <p class="small mb-0">${data.weather[0].main}</p>
                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-around align-items-center mb-3">
                                                    <div class="flex-column">
                                                        <i class="fas fa-minus"></i>
                                                    </div>
                                                    <div class="flex-column border" style="border-radius: 10px; padding: .75rem">
                                                        <p class="small mb-1">Sun</p>
                                                        <p class="small mb-0"><strong>${data.main.temp}°C</strong></p>
                                                    </div>
                                                    <div class="flex-column">
                                                        <p class="small mb-1">Mon</p>
                                                        <p class="small mb-0"><strong>${data.main.temp}°C</strong></p>
                                                    </div>
                                                    <div class="flex-column">
                                                        <p class="small mb-1">Tue</p>
                                                        <p class="small mb-0"><strong>${data.main.temp}°C</strong></p>
                                                    </div>
                                                    <div class="flex-column">
                                                        <p class="small mb-1">Wed</p>
                                                        <p class="small mb-0"><strong>${data.main.temp}°C</strong></p>
                                                    </div>
                                                    <div class="flex-column">
                                                        <p class="small mb-1">Thu</p>
                                                        <p class="small mb-0"><strong>${data.main.temp}°C</strong></p>
                                                    </div>
                                                    <div class="flex-column">
                                                        <p class="small mb-1">Fri</p>
                                                        <p class="small mb-0"><strong>${data.main.temp}°C</strong></p>
                                                    </div>
                                                    <div class="flex-column">
                                                        <p class="small mb-1">Sat</p>
                                                        <p class="small mb-0"><strong>${data.main.temp}°C</strong></p>
                                                    </div>
                                                    <div class="flex-column">
                                                        <i class="fas fa-minus"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-3 text-center py-4 mt-4">
                                                <p class="small mb-0">Kecepatan Angin</p>
                                                <i class="fas fa-wind fa-2x mb-3"></i>
                                                <p class="small mb-0">${data.wind.speed} km/h</p>
                                                <hr>
                                                <p class="small mb-0">Kelembaban</p>
                                                <i class="fas fa-tint fa-2x mb-3"></i>
                                                <p class="small mb-0">${data.main.humidity}%</p>
                                                <hr>
                                                <p class="small mb-0">Matahari Terbit</p>
                                                <i class="fas fa-sun fa-2x mb-3"></i>
                                                <p class="small mb-0">${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                                                <hr>
                                                <p class="small mb-0">Matahari Tenggelam</p>
                                                <i class="fas fa-moon fa-2x mb-3"></i>
                                                <p class="small mb-0">${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `;
        })
        .catch(error => console.error('Error fetching weather data:', error));

    fetch(monthlyApiUrl)
        .then(response => response.json())
        .then(data => {
            const monthlyWeather = document.getElementById('monthlyWeather');
            monthlyWeather.style.display = 'block';
            monthlyWeather.innerHTML = `
                <h3>Ramalan Cuaca Bulanan di ${location}</h3>
                <ul class="list-group">
                    ${data.list.map(day => `
                        <li class="list-group-item">
                            <strong>${new Date(day.dt * 1000).toLocaleDateString()}</strong>
                            : ${day.temp.day}°C, ${day.weather[0].description}
                        </li>
                    `).join('')}
                </ul>
            `;
        })
        .catch(error => console.error('Error fetching monthly weather data:', error));
}

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);

    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert('Pesan berhasil dikirim.');
        document.getElementById('contactForm').reset();
    })
    .catch(error => console.error('Error sending form:', error));
});
