export interface Unit {
  id: string;
  name: string;
  abbre_name: string;
  unitPin: string;
  unitType: UnitType;
  parentUnit: Unit;

  //   for use in select and search
  [key: string]: any;
}
