"use client";

const { useEffect } = require("react");

const BootstrapClient = () => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
};

export default BootstrapClient;
