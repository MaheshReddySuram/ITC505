document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const numbersDisplay = document.getElementById('numbersDisplay');
    const searchResults = document.getElementById('searchResults');
    
    // Predefined list of numbers (can be modified)
    const numbers = [7, 23, 42, 16, 8, 19, 3, 55, 91, 12, 34, 27, 5, 18, 29];
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    
    // Display the numbers
    displayNumbers(numbers);
    
    searchBtn.addEventListener('click', searchNumber);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchNumber();
        }
    });
    
    function displayNumbers(numArray) {
        numbersDisplay.innerHTML = '';
        numArray.forEach(num => {
            const numElement = document.createElement('div');
            numElement.className = 'number';
            numElement.textContent = num;
            numElement.dataset.value = num;
            numbersDisplay.appendChild(numElement);
        });
    }
    
    function searchNumber() {
        const searchValue = parseInt(searchInput.value);
        
        if (isNaN(searchValue)) {
            searchResults.innerHTML = '<p>Please enter a valid number</p>';
            return;
        }
        
        // Reset all number displays
        document.querySelectorAll('.number').forEach(el => {
            el.classList.remove('found');
        });
        
        // Perform searches
        const linearResult = linearSearch(numbers, searchValue);
        const binaryResult = binarySearch(sortedNumbers, searchValue);
        
        // Display results
        let resultsHTML = `
            <h3>Search Results for ${searchValue}</h3>
            <div class="result-item">
                <strong>Linear Search:</strong> ${linearResult.found ? 
                    `Found at position ${linearResult.index} (unsorted array)` : 'Not found'}
            </div>
            <div class="result-item">
                <strong>Binary Search:</strong> ${binaryResult.found ? 
                    `Found at position ${binaryResult.index} (sorted array)` : 'Not found'}
            </div>
            <div class="result-item">
                <strong>Total occurrences:</strong> ${countOccurrences(numbers, searchValue)}
            </div>
        `;
        
        searchResults.innerHTML = resultsHTML;
        
        // Highlight found numbers
        if (linearResult.found) {
            document.querySelectorAll(`.number[data-value="${searchValue}"]`).forEach(el => {
                el.classList.add('found');
            });
        }
    }
    
    function linearSearch(array, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return { found: true, index: i };
            }
        }
        return { found: false, index: -1 };
    }
    
    function binarySearch(array, value) {
        let left = 0;
        let right = array.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (array[mid] === value) {
                return { found: true, index: mid };
            } else if (array[mid] < value) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return { found: false, index: -1 };
    }
    
    function countOccurrences(array, value) {
        return array.reduce((count, num) => num === value ? count + 1 : count, 0);
    }
});