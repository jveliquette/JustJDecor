function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center bg-image" style={{backgroundImage: "url('./public/carcar.png')", backgroundSize: "cover", backgroundPosition: "center", color: "white", height: "400px", position: "relative", borderRadius: "2rem"}}>
      <div style={{backgroundColor: "rgba(0, 0, 0, 0.75", padding: "20px", borderRadius: "2rem", position: "relative", zIndex: 1, display: "inline-block"}}>
        <h1 className="display-5 fw-bold">CarCar</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            The premiere solution for automobile dealership
            management!
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
