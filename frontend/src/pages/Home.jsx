function Home() {
    return (
        <div className="home">

            <div className="hero">

                <h1>Welcome to ShowSpot 🎬</h1>

                <p>
                    Book your favourite movies, choose your seats
                    and enjoy the show.
                </p>

                <button>
                    Explore Movies
                </button>

            </div>

            <section className="features">

                <h2>Why Choose ShowSpot?</h2>

                <div className="feature-container">

                    <div className="feature-card">
                        <h3>🎥 Latest Movies</h3>
                        <p>
                            Discover the latest movies available
                            in theatres.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>💺 Easy Seat Selection</h3>
                        <p>
                            Select your preferred seats easily
                            before booking.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>🎟️ Easy Booking</h3>
                        <p>
                            Book your movie tickets quickly and
                            securely.
                        </p>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default Home;