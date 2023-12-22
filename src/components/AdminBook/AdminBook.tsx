import { useState, useRef } from "react";
import ScheduleTable from "../ScheduleTable/ScheduleTable";
import { SeatsioSeatingChart } from '@seatsio/seatsio-react';
import TextField from "@mui/material/TextField";

function AdminBook() {
  const chartRef = useRef<any>(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const handleClose = () => {
    setShowConfirmationDialog(false);
    setSelectedTable(null);
    chartRef.current?.deselectObjects(chartRef.current?.selectedObjects);
  };

  const handleSelect = (selectedObject: any) => {
    console.log('Selected Object:', selectedObject);

    if (selectedObject.objectType && selectedObject.objectType.toLowerCase() === 'table') {
      if (selectedTable && selectedTable !== selectedObject.label) {
        handleClose();
      }

      if (selectedTable !== selectedObject.label) {
        setShowConfirmationDialog(true);
        setSelectedTable(selectedObject.label);
      }
    }
  };

  function handleSubmit(selectedDates, selectedTime) {
    console.log(selectedDates);
    console.log(selectedTime);
    console.log(selectedTable);

    chartRef.current?.deselectObjects(chartRef.current?.selectedObjects);
  }

  return (
    <div style={{ height: '550px', margin: "8rem 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
     

      <SeatsioSeatingChart
        workspaceKey={import.meta.env.VITE_PUBLIC_WORKSPACE}
        event={import.meta.env.VITE_EVENT_KEY}
        region={import.meta.env.VITE_SEATSIO_REGION}
        onRenderStarted={(createdChart) => { chartRef.current = createdChart; }}
        onObjectClicked={handleSelect}
      />

      {selectedTable && (
        <ScheduleTable
          open={showConfirmationDialog}
          onClose={handleClose}
          tableLabel={selectedTable}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default AdminBook;
