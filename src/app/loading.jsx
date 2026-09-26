
export default function Loading() {
  return (
    <main
      className="loading-box"
      style={{
        minHeight: '70vh',
        border: 0,
        background: 'transparent',
      }}>
      <div>
       
        <div
          className="spinner"
          style={{ margin: '0 auto 14px' }}/>

       
        <p>Loading FitLog…</p>
      </div>
    </main>
  );
}
