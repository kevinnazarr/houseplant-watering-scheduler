export function EmptyState() {
  return (
    <div className="empty-state">
      <p className="empty-state__icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21v-8" />
          <path d="M12 13c0-4 3-6.5 7-6.5.2 3.8-2.5 6.5-7 6.5z" />
          <path d="M12 10C12 6.7 9.6 4.5 6 4.5 5.8 7.9 8.1 10 12 10z" />
        </svg>
      </p>
      <h2>No plants yet</h2>
      <p>Add your first plant to start tracking its watering schedule.</p>
    </div>
  );
}
