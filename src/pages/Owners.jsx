import useFetch from '../lib/useFetch';

export default function Owners() {
    const { data: services, loading } = useFetch('owner-services/');

    if (loading) return <p>Loading services...</p>;
    
    return (
      <section>
        <h2>Owner Services</h2>
        <p className="lead">We manage your property as if it were our own — ensuring stable tenants, consistent income, and long-term growth.</p>
  
        <ul>
          <li><strong>Tenant Screening:</strong> Comprehensive background, employment, and credit checks.</li>
          <li><strong>Rent Collection:</strong> Secure online payment systems and timely disbursements.</li>
          <li><strong>Maintenance Coordination:</strong> Reliable vendors and transparent work-order tracking.</li>
          <li><strong>Financial Reporting:</strong> Detailed monthly and year-end reports available in your Owner Portal.</li>
        </ul>
  
        <p className="mt-4">Ready to partner with a team that protects your investment? <a href="/contact">Contact us today.</a></p>
      </section>
    );
  }