import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from '../components/BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
	const createBlog = jest.fn()

	const component = render(<BlogForm handleBlog={createBlog} />)

	const input = component.container.querySelector('.author')
	const form = component.container.querySelector('form')

	fireEvent.change(input, {
		target: { value: 'authooooooor' },
	})
	fireEvent.submit(form)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0].author).toBe('authooooooor')
})
