import * as React from "react";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { IconButton, LinearProgress, makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getEmployeeList } from "../redux/empoyees_list/employee_slice";
import { Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { GridToolbarContainer } from "@mui/x-data-grid-pro";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { NavLink, useHistory } from "react-router-dom";
import { DeleteEmployeesData } from "../redux/apiCalls/apiCalls";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: theme.spacing(12, 4, 3),
    padding: theme.spacing(3, 4),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  grid_items_left: {
    marginLeft: theme.spacing(3),
  },
  grid_items_right: {
    marginRight: theme.spacing(3),
  },
}));

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

let fetchEmployee;

function RowMenuCell(props) {
  const { id } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleEditClick = (id) => {
    history.push(`/employees/${id}/edit`);
  };

  const handleDelete = (id) => {
    DeleteEmployeesData(id);
    fetchEmployee();
  };

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        className={classes.textPrimary}
        size="small"
        aria-label="edit"
        onClick={() => handleEditClick(id)}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        color="inherit"
        size="small"
        aria-label="delete"
        onClick={() => handleDelete(id)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

export default function Employees() {
  const classes = useStyles();
  const [pageSize, setPageSize] = React.useState(5);
  const employeesDispatch = useDispatch();
  const [call, setCall] = useState(false);
  const [loading, setLoading] = useState(false);

  fetchEmployee = async () => {
    setCall(true);
    setLoading(true);
    try {
      await axios
        .get("http://training.pixbit.in/api/employees", {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
        })
        .then((res) => {
          console.log(res.data.data);
          employeesDispatch(getEmployeeList({ employeeList: res.data.data }));
          setLoading(false);
        });
    } catch (err) {
      console.log("Employee fetch err " + err.message);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchEmployee();
    setCall(false);
  }, [call]);

  //Data conversions
  const employeeData = useSelector(
    (state) => state.employee_list.value.employeeList
  );

  function deignation(id) {
    if (id === 1) {
      return "React Developer";
    } else if (id === 2) {
      return "Java Developer";
    } else if (id === 3) {
      return "PHP Developer";
    }
  }
  let rows = employeeData.map((item, index) => {
    return {
      ...item,
      keys: index + 1,
      id: item.id,
      date_of_birth: new Date(item.date_of_birth).toLocaleDateString(),
      join_date: new Date(item.join_date).toLocaleDateString(),
      designation_id: deignation(item.designation_id),
    };
  });

  const columns = [
    { field: "keys", headerName: "Sl No", width: 120, align: "center" },
    {
      field: "first_name",
      headerName: "First Name",
      width: 150,
      align: "left",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 150,
      align: "left",
    },
    {
      field: "join_date",
      headerName: "Join Date",
      width: 150,
      type: "date",
      align: "left",
    },
    {
      field: "date_of_birth",
      headerName: "Date of Birth",
      width: 180,
      type: "date",
      align: "left",
    },
    { field: "gender", headerName: "Gender", width: 150, align: "left" },
    {
      field: "designation_id",
      headerName: "Designation",
      width: 150,
      align: "left",
    },
    { field: "email", headerName: "Email", width: 200, align: "left" },
    {
      field: "profile_picture",
      headerName: "Profile Picture",
      width: 180,
      align: "left",
    },
    { field: "resume", headerName: "Resume", width: 150, align: "left" },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: RowMenuCell,
      sortable: false,
      width: 100,
      headerAlign: "center",
      filterable: false,
      disableColumnMenu: true,
      disableReorder: true,
    },
  ];

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        className={classes.title}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item className={classes.grid_items_left}>
          <Typography variant="h6" component="h1">
            Employees List
          </Typography>
        </Grid>
        <Grid item className={classes.grid_items_right}>
          <GridToolbarContainer>
            <Button variant="outlined" color="primary" startIcon={<AddIcon />}>
              <NavLink
                to="/employees/create"
                className="link"
                style={{ color: "#000" }}
                activeClassName="active"
              >
                Create Employee
              </NavLink>
            </Button>
          </GridToolbarContainer>
        </Grid>
      </Grid>
      <div style={{ height: "50vh", width: "100%" }}>
        <DataGrid
          editMode="row"
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          components={{
            LoadingOverlay: CustomLoadingOverlay,
          }}
          loading={loading}
        />
      </div>
    </Paper>
  );
}
