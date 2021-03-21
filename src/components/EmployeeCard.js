export default function EmployeeCard(props) {
  return (
    <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6 p-2">
      <div className="card rounded shadow-lg">
        <img src={props.picture.large} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">
            {props.name.first} {props.name.last}
          </h5>
          <p class="card-text">
            <ul>
              <li>{props.email}</li>

              <li>{props.phone}</li>
            </ul>
          </p>
          <a href="/#" class="btn btn-primary">
            Contact {props.name.first}
          </a>
        </div>
      </div>
    </div>
  );
}
