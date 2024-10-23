#!/bin/zsh

# Get the changes in the working directory
changes=$(git diff)

# Check if there are any changes
if [[ -z "$changes" ]]; then
    echo "No changes to commit."
    exit 0
fi

# Summarize the changes using LLM
summary=$(echo """
<Instructions>
You are a helpful assistant that summarizes git changes into concise commit messages. Respond with only the commit message, no other text.
</Instructions>

<Changes>
$changes
</Changes>
""" | llm)

# Add all changes to the staging area
git add .

# Commit the changes
git commit -m "$summary"

# Get the current branch name
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Try to push the commit to the remote repository
push_output=$(git push 2>&1)

# Check if the push failed due to no upstream branch
if echo "$push_output" | grep -q "no upstream branch"; then
    echo "No upstream branch set. Setting upstream and pushing..."
    git push --set-upstream origin "$current_branch"
else
    echo "$push_output"
fi

echo "Changes committed and pushed successfully."
