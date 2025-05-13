import React, { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import apiClient from "../../api/client";
import { toast } from "react-hot-toast";
import { SideBar } from "../sidebar/sidebar";
import "./main.css";
const Main = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data } = await apiClient.get("/activities");
        setActivities(data);
      } catch {
        toast.error("Failed to load activities");
      }
    };
    fetchActivities();
  }, []);

  const handleAddActivity = async (newData) => {
    try {
      const { data } = await apiClient.post("/activities", newData);
      setActivities((prev) => [...prev, data]);
      toast.success("Activity added");
    } catch {
      toast.error("Failed to add activity");
    }
  };

  const handleUpdateActivity = async (newData, oldData) => {
    if (!oldData) return;
    try {
      await apiClient.put(`/activities/${oldData.id}`, newData);
      setActivities((prev) =>
        prev.map((activity) =>
          activity.id === oldData.id ? newData : activity
        )
      );
      toast.success("Activity updated");
    } catch {
      toast.error("Failed to update activity");
    }
  };

  const handleDeleteActivity = async (oldData) => {
    if (!oldData) return;
    try {
      await apiClient.delete(`/activities/${oldData.id}`);
      setActivities((prev) =>
        prev.filter((activity) => activity.id !== oldData.id)
      );
      toast.success("Activity deleted");
    } catch {
      toast.error("Failed to delete activity");
    }
  };

  return (
    <>
     <div className="layout">
      <SideBar className="sidebar" />
      <div className="main-container">
        <MaterialTable
          title="Activity List"
          columns={[
            { title: "Name", field: "name" },
            { title: "When", field: "when", type: "date" ,render: rowData => new Date(rowData.when).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  })},
          ]}
          data={activities}
          editable={{
            onRowAdd: (newData) => handleAddActivity(newData),
            onRowUpdate: (newData, oldData) =>
              handleUpdateActivity(newData, oldData),
            onRowDelete: (oldData) => handleDeleteActivity(oldData),
          }}
          options={{ actionsColumnIndex: -1 }}
       />
      </div>
    </div>
    </>
  );
};

export default Main;