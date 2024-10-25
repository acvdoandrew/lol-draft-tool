import { GetStaticProps } from 'next';
import { useContext } from 'react';
import { fetchChampions } from '@/utils/fetchChampions';
import { ChampionsData } from '@/utils/types';
import { DraftContext } from '../contexts/DraftContext';