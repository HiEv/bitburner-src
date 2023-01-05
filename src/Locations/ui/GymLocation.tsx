/**
 * React Subcomponent for displaying a location's UI, when that location is a gym
 *
 * This subcomponent renders all of the buttons for training at the gym
 */
import * as React from "react";
import Button from "@mui/material/Button";

import { Location } from "../Location";

import { Player } from "@player";

import { Money } from "../../ui/React/Money";
import { Router } from "../../ui/GameRoot";
import { Page } from "../../ui/Router";
import { Box } from "@mui/material";
import { ClassWork, Classes } from "../../Work/ClassWork";
import { calculateCost } from "../../Work/Formulas";
import { GymType, GymTypes } from "../../Enums";

type IProps = {
  loc: Location;
};

export function GymLocation(props: IProps): React.ReactElement {
  function train(stat: GymType): void {
    Player.startWork(
      new ClassWork({
        classType: stat,
        location: props.loc.name,
        singularity: false,
      }),
    );
    Player.startFocusing();
    Router.toPage(Page.Work);
  }

  const cost = calculateCost(Classes[GymTypes.strength], props.loc);

  return (
    <Box sx={{ display: "grid", width: "fit-content" }}>
      <Button onClick={() => train(GymTypes.strength)}>
        Train Strength (<Money money={cost} forPurchase={true} /> / sec)
      </Button>
      <Button onClick={() => train(GymTypes.defense)}>
        Train Defense (<Money money={cost} forPurchase={true} /> / sec)
      </Button>
      <Button onClick={() => train(GymTypes.dexterity)}>
        Train Dexterity (<Money money={cost} forPurchase={true} /> / sec)
      </Button>
      <Button onClick={() => train(GymTypes.agility)}>
        Train Agility (<Money money={cost} forPurchase={true} /> / sec)
      </Button>
    </Box>
  );
}
