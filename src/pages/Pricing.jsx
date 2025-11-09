export default function Pricing() {
    return (
      <section>
        <h2>Simple & Transparent Pricing</h2>
        <p className="lead">No hidden fees, no surprises — just fair and flexible plans for every property owner.</p>
  
        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>Plan</th>
              <th>Monthly Fee</th>
              <th>Includes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Essential</td>
              <td>8% of monthly rent</td>
              <td>Tenant placement, rent collection, and maintenance coordination.</td>
            </tr>
            <tr>
              <td>Premium</td>
              <td>10% of monthly rent</td>
              <td>All Essential features plus routine inspections and eviction protection.</td>
            </tr>
          </tbody>
        </table>
  
        <p className="mt-3">For multi-property owners, we offer discounted portfolio pricing. <a href="/contact">Contact us</a> for details.</p>
      </section>
    );
  }