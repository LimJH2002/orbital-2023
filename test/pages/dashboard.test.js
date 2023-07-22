import { render, screen } from '@testing-library/react';
import Table from '@/components/table';

describe("Table", () => {
    it('should render the add transaction button', async () => {
        render(<Table />)
    })
})