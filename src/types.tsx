export interface GameSlot {
  id: number;
  rnr: number;
  gameId: number;
  numGuests: number;
  gameStatusId: number;
  gameGuideId: number;
  giveawayId: number;
  textSent: boolean;
  seApCall: boolean;
  seApCallNotes: string;
  gameNotes: string;
}

// In Game, Ready, Waivering, etc ...
export interface GameStatus {
  id: number;
  name: string;
}

// Morning Block, CST Block, etc ...
export interface GameSlotStatus {
  id: number;
  name: string;
}

export interface Game {
  id: number;
  name: string;
  difficulty: number;
} 

export interface Giveaway {
  id: number;
  giveawayTypeId: number;
  notes: string;
} 

export interface GiveawayType {
  id: number;
  name: string;
} 

export interface TeamMember {
  id: number;
  ges: boolean;
  tlL: boolean;
  amit: boolean;
  mgmt: boolean;
}

/* ////// Acronyms ////// */
/*
AP: Age Policy
A&P: Apparel & Product



*/