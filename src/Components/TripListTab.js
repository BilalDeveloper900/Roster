import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { tripMembers } from "../Stores/Slices";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const { id } = useParams();
  const [memberData, setMemberData] = useState();
  const [memberData1, setMemberData1] = useState();
  const [memberData2, setMemberData2] = useState();

  const firstMember = () => {
    dispatch(tripMembers(id)).then((res) => {
      setMemberData(res.payload.data.all_members.members);
      setMemberData1(res.payload.data.am_on_bus.members);
      setMemberData2(res.payload.data.pm_return.members);
      console.log(memberData, "member---data");
    });
  };

  useEffect(() => {
    firstMember();
  }, []);

  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <Box sx={{ width: "100%" }} className="px-3 ">
      <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
        <div className="p-3 pb-0">
          Trip Members: <span>({props.number})</span>
        </div>

        <div className="search-box pb-3">
          <div className="search">
            <i className="fa fa-search ms-auto  " aria-hidden="true" />
            <input
              type="text"
              className="input"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All" {...a11yProps(0)} sx={{ width: "33%" }} />
          <Tab label="AM-ON-BUS" {...a11yProps(1)} sx={{ width: "33%" }} />
          <Tab label="PM-RETURN" {...a11yProps(2)} sx={{ width: "34%" }} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0} sx={{ width: "100%" }}>
        <div className="d-flex justify-content-around color1">
          <p>NAME</p>
          <p>MEMBER ID</p>
          <p>STATUS</p>
        </div>
        {memberData &&
          memberData
            .filter(
              (x) =>
                x.first_name.toLowerCase().includes(search) ||
                x.last_name.toLowerCase().includes(search)
            )
            .map((value, index) => (
              <div className="d-flex justify-content-around" key={index}>
                <span className="member-list ">
                  <p>
                    {value.first_name} {value.last_name}
                  </p>
                </span>

                <span className="member-list ">
                  <p className="list-id">#{value.id}</p>
                </span>

                <span className="member-list ">
                  <p
                    className={
                      value.boarding_status === "AM-ON-BUS"
                        ? "am-bus"
                        : value.boarding_status === "PM-RETURN"
                        ? "pm-bus"
                        : value.boarding_status === "Waiting"
                        ? "waiting"
                        : "undefine"
                    }
                  >
                    {value.boarding_status}
                  </p>
                </span>
              </div>
            ))}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <div className="d-flex justify-content-around color1">
          <p>NAME</p>
          <p>MEMBER ID</p>
          <p>STATUS</p>
        </div>
        {memberData1 &&
          memberData1
            .filter(
              (x) =>
                x.first_name.toLowerCase().includes(search) ||
                x.last_name.toLowerCase().includes(search)
            )
            .map((value, index) => (
              <div className="d-flex justify-content-around" key={index}>
                <span className="member-list ">
                  <p>
                    {value.first_name} {value.last_name}
                  </p>
                </span>

                <span className="member-list ">
                  <p className="list-id">#{value.id}</p>
                </span>

                <span className="member-list ">
                  <p
                    className={
                      value.boarding_status === "AM-ON-BUS"
                        ? "am-bus"
                        : value.boarding_status === "PM-RETURN"
                        ? "pm-bus"
                        : value.boarding_status === "Waiting"
                        ? "waiting"
                        : "undefine"
                    }
                  >
                    {value.boarding_status}
                  </p>
                </span>
              </div>
            ))}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <div className="d-flex justify-content-around color1">
          <p>NAME</p>
          <p>MEMBER ID</p>
          <p>STATUS</p>
        </div>
        {memberData2 &&
          memberData2
            .filter(
              (x) =>
                x.first_name.toLowerCase().includes(search) ||
                x.last_name.toLowerCase().includes(search)
            )
            .map((value, index) => (
              <div
                className="d-flex justify-content-around member-outer"
                key={index}
              >
                <span className="member-list ">
                  <p>
                    {value.first_name} {value.last_name}
                  </p>
                </span>

                <span className="member-list ">
                  <p className="list-id">#{value.id}</p>
                </span>

                <span className="member-list ">
                  <p
                    className={
                      value.boarding_status === "AM-ON-BUS"
                        ? "am-bus"
                        : value.boarding_status === "PM-RETURN"
                        ? "pm-bus"
                        : value.boarding_status === "Waiting"
                        ? "waiting"
                        : "undefine"
                    }
                  >
                    {value.boarding_status}
                  </p>
                </span>
              </div>
            ))}
      </CustomTabPanel>
    </Box>
  );
}
