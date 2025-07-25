import { MemoryRouter } from "react-router-dom";
import { screen, render } from '@testing-library/react';
import RaceMenu from "./RaceMenu";
import { ROUTES } from "@/shared/const/routes";

describe('Component: RaceMenu', () => {
    it("renders all expected links with correct urls", () => {
        render(
            <MemoryRouter>
                <RaceMenu />
            </MemoryRouter>
        )

        expect(screen.getByText(/Главная/i)).toHaveAttribute(
            'href',
            ROUTES.RACE_TAXI.HOME
        )
        expect(screen.getByText(/Дрифт-Такси/i)).toHaveAttribute(
            'href',
            ROUTES.RACE_TAXI.DRIFT
        )
        expect(screen.getByText(/Time Attack/i)).toHaveAttribute(
            'href',
            ROUTES.RACE_TAXI.TIME_ATTACK
        )
        expect(screen.getByText(/Forza Carting/i)).toHaveAttribute(
            'href',
            ROUTES.RACE_TAXI.FORZA
        )
    }),
    
    it('applies active class to current route', () => {
        render(
            <MemoryRouter initialEntries={[ROUTES.RACE_TAXI.DRIFT]}>
                <RaceMenu />
            </MemoryRouter>
        )  
        
        const activeLink = screen.getByText(/Дрифт-Такси/i)
        
        expect(activeLink).toHaveClass('race-menu__item-active')
 
    })
})
