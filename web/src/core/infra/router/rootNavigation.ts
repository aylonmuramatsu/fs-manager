/* eslint-disable require-jsdoc */
import React from "react";

export const navigationRef: any = React.createRef();

export function navigateTo(route: string, params?: any) {
  navigationRef?.current.navigateTo(route, params);
}

export function goBack() {
  navigationRef?.current.navigateTo(-1);
}
