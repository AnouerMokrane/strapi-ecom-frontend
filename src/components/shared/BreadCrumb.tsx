import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const BreadCrumb = () => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <div
      className={`py-8 bg-neutral-white-100 ${
        location.pathname === "/" && "hidden"
      }`}
    >
      <Breadcrumb className="container">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/`}>Ecommerce</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathnames.map((path, index) => (
            <React.Fragment key={path}>
              <BreadcrumbSeparator />
              <BreadcrumbItem className=" capitalize">
                {index === pathnames.length - 1 ? (
                  path.replace(/%20|-/g, " ")
                ) : (
                  <BreadcrumbLink asChild>
                    <Link className=" capitalize" to={`/${path}`}>
                      {path.replace(/%20|-/g, " ")}{" "}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb;
