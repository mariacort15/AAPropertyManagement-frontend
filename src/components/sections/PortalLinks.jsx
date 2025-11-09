export default function PortalLinks({ compact=false }) {
    return (
      <div className={`portal-links ${compact ? 'compact':''}`}>
        <a href="/owner-portal" className="btn" aria-label="Owner Portal">Owner Portal</a>
        <a href="/resident-portal" className="btn outline" aria-label="Resident Portal">Resident Portal</a>
      </div>
    );
  }