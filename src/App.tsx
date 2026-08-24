import { PlantForm } from './components/PlantForm';
import { PlantList } from './components/PlantList';
import { DashboardSummary } from './components/DashboardSummary';
import { EmptyState } from './components/EmptyState';
import { usePlants } from './hooks/usePlants';

function App() {
  const { plants, addPlant, waterPlant, deletePlant } = usePlants();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Houseplant Watering Scheduler</h1>
        <p className="app-subtitle">Keep your plants happy and hydrated</p>
      </header>

      <main className="app-main">
        <PlantForm onAddPlant={addPlant} />

        {plants.length > 0 ? (
          <>
            <DashboardSummary plants={plants} />
            <PlantList
              plants={plants}
              onWater={waterPlant}
              onDelete={deletePlant}
            />
          </>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}

export default App;
