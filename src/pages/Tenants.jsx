import useFetch from '../lib/useFetch';

export default function Tenants() {
    const { data: resources, loading } = useFetch('tenant-resources/');

    if (loading) return <p>Loading tenant resources...</p>;
    return (
      <section>
        <h2>Tenant Resources</h2>
        <p className="lead">We make renting simple, convenient, and comfortable.</p>
  
        <div className="row mt-3">
          <div className="col-md-6">
            <h5>Resident Portal</h5>
            <p>Pay rent online, submit maintenance requests, and access lease documents anytime.</p>
          </div>
          <div className="col-md-6">
            <h5>Maintenance Requests</h5>
            <p>Submit issues 24/7 through your portal and track progress in real-time.</p>
          </div>
        </div>
  
        <p className="mt-4">Questions about your lease or payment options? Visit our <a href="/contact">contact page</a>.</p>
      </section>
    );
  }