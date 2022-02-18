import React from 'react';
import { TalkDocument } from '../lib/sanityTypes';

export const TalksContext = React.createContext<TalkDocument[] | undefined>(undefined);
