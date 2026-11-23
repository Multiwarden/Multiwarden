#!/usr/bin/env bash
# Prints a "Multiwarden features" section for a platform release: every feature from the spec
# that a pull request merged between two tags names in a "Feature: <id>" line.
#
# Usage: feature-notes.sh <owner/repo> <previous-tag> <new-ref>
# Needs: gh (authenticated, GH_TOKEN in Actions), git history with both refs.
#
# Platform release workflows run it after `gh release create --generate-notes` and append the
# output with `gh release edit --notes-file`. See ../process.md#release-notes.
set -euo pipefail

repo="$1"
from="$2"
to="$3"
spec="https://github.com/multiwarden/multiwarden/blob/main/spec/features"

prs=$(git log --format='%s%n%b' "${from}..${to}" |
  grep -oE '(Merge pull request #[0-9]+|\(#[0-9]+\))' |
  grep -oE '[0-9]+' | sort -un || true)

declare -A prs_for=()
order=()
for pr in $prs; do
  body=$(gh api "repos/${repo}/pulls/${pr}" --jq '.body // ""' 2>/dev/null || true)
  while read -r id; do
    [ -z "$id" ] && continue
    [ -z "${prs_for[$id]:-}" ] && order+=("$id")
    prs_for[$id]="${prs_for[$id]:+${prs_for[$id]}, }#${pr}"
  done < <(printf '%s\n' "$body" | sed -nE 's/^[[:space:]]*Feature:[[:space:]]*`?([a-z0-9-]+)`?.*$/\1/p')
done

if [ "${#order[@]}" -gt 0 ]; then
  echo "## Multiwarden features"
  echo
  echo "Spec pages for the features this release adds or changes:"
  echo
  for id in "${order[@]}"; do
    echo "- [\`${id}\`](${spec}/${id}.md): ${prs_for[$id]}"
  done
fi
