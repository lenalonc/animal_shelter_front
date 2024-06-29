import { useEffect, useState } from "react";
import api from "../../api/Api";
import TableCustom from "./Table";
import TableAdmins from "./TableAdmins";
import { Link } from "react-router-dom";
import ErrorModal from "../ErrorModal";
import SuccessModal from "../Success modal";

const Admins = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [systemError, setSystemError] = useState(false);

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    try {
      const response = await api.get("/admin");
      const formattedData = response.data.map((owner) => ({
        id: owner.id,
        username: owner.username,
        firstname: owner.firstname,
        lastname: owner.lastname,
      }));
      setData(formattedData);
      if (!formattedData || formattedData.length === 0) {
        setSystemError(true);
      }
    } catch (err) {
      setSystemError(true);
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const handleRowClick = (id) => {
    setSelectedRow((prevSelectedRow) => (prevSelectedRow === id ? null : id));
  };

  return (
    <div className="view-all-page">
      <h2 className="title-tbl">ADMINS</h2>
      <TableAdmins
        onRowClick={handleRowClick}
        selectedRow={selectedRow}
        data={data}
        fetchData={getAdmins}
      />
      {systemError && (
        <ErrorModal
          message={"System could not load admins"}
          onClose={() => setSystemError(false)}
        />
      )}
    </div>
  );
};

export default Admins;
