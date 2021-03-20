export default function EmployeeCard(props) {
  return (
    <div className="col-2 p-4">
      <div className="card rounded shadow-lg">
        <img src={props.picture.large} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="/#" class="btn btn-primary">
            Contact (persons name)
          </a>
        </div>
      </div>
    </div>
  );
}
