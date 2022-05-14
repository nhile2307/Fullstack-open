import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import BlogItem from '../components/BlogItem'
import { render, fireEvent } from '@testing-library/react'

describe('<Blog />', () => {
	const blog = {
		title: 'Component testing is done with react-testing-library',
		author: 'authooooooor',
		url: 'http://',
		likes: 0,
	}

	let component
	const mockHandler = jest.fn()

	beforeEach(() => {
		component = render(<BlogItem blog={blog} handleLike={mockHandler} />)
	})

	test('Display blog title and author, url and likes are not shown by default', () => {
		const hiddenContent = component.container.querySelector('.hidden-content')

		expect(component.container).toHaveTextContent(blog.title)
		expect(component.container).toHaveTextContent(blog.author)
		expect(hiddenContent).toHaveStyle('display: none')
	})

	test('Url and likes display after view button is clicked', () => {
		const hiddenContent = component.container.querySelector('.hidden-content')

		const button = component.getByText('view')
		fireEvent.click(button)
		expect(hiddenContent).toHaveStyle('display: block')
		expect(button).toHaveTextContent('hide')
	})

	test('like button is clicked twice, the event handler the component received as props is called twice', () => {
		const button = component.getByText('like')
		fireEvent.click(button)
		fireEvent.click(button)
		expect(mockHandler.mock.calls).toHaveLength(2)
	})
})
