import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { members } from "../Stores/Slices";
import { useState, useEffect } from "react";

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();

  const [memberData, setMemberData] = useState();
  const [memberData1, setMemberData1] = useState();
  const [memberData2, setMemberData2] = useState();

  const firstMember = () => {
    dispatch(members()).then((res) => {
      setMemberData(res.payload.data.all_members.members);
      console.log(memberData, "member---data");
    });
  };

  const secondMember = () => {
    dispatch(members()).then((res) => {
      setMemberData1(res.payload.data.am_on_bus.members);
      console.log(memberData1, "member---data");
    });
  };

  const thirdMember = () => {
    dispatch(members()).then((res) => {
      setMemberData2(res.payload.data.pm_return.members);
      console.log(memberData2, "member---data");
    });
  };

  useEffect(() => {
    firstMember();
    secondMember();
    thirdMember();
  }, []);

  return (
    <Box sx={{ width: "100%" }} className="px-3">
      <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All" {...a11yProps(0)} sx={{ width: "33.33%" }} />
          <Tab label="AM-ON-BUS" {...a11yProps(1)} sx={{ width: "33.33%" }} />
          <Tab label="PM-RETURN" {...a11yProps(2)} sx={{ width: "33.33%" }} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0} sx={{ width: "100%" }}>
        <div className="d-flex justify-content-around color1">
          <p>NAME</p>
          <p>MEMBER ID</p>
          <p>STATUS</p>
        </div>
        {memberData &&
          memberData.map((value, index) => (
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
                <p className="list-status">{value.boarding_status}</p>
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
          memberData1.map((value, index) => (
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
                <p className="list-status">{value.boarding_status}</p>
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
          memberData2.map((value, index) => (
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
                <p className="list-status">{value.boarding_status}</p>
              </span>
            </div>
          ))}
      </CustomTabPanel>
    </Box>
  );
}
